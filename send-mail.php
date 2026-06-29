<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json');

require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

/*
 * Load private config from a non-public file when available.
 * On the live server, prefer placing mail-config.php one level above public_html.
 */
$privateConfigPaths = [
    dirname(__DIR__) . '/mail-config.php',
    __DIR__ . '/mail-config.php',
];
$privateConfig = [];

foreach ($privateConfigPaths as $configPath) {
    if (is_file($configPath)) {
        $loadedConfig = require $configPath;
        if (is_array($loadedConfig)) {
            $privateConfig = $loadedConfig;
            break;
        }
    }
}

function config_value(string $key, $default = '')
{
    global $privateConfig;

    $envValue = getenv($key);
    if ($envValue !== false && $envValue !== '') {
        return $envValue;
    }

    if (array_key_exists($key, $privateConfig) && $privateConfig[$key] !== '') {
        return $privateConfig[$key];
    }

    return $default;
}

$smtpHost = config_value('DUCES_SMTP_HOST', 'mail.ducescapital.co.za');
$smtpPort = (int) config_value('DUCES_SMTP_PORT', 587);
$smtpUser = config_value('DUCES_SMTP_USER', 'noreply@ducescapital.co.za');
$smtpPass = config_value('DUCES_SMTP_PASS');
$fromEmail = config_value('DUCES_FROM_EMAIL', 'noreply@ducescapital.co.za');
$fromName = config_value('DUCES_FROM_NAME', 'Duces Capital (No-Reply)');
$toEmail = config_value('DUCES_CONTACT_TO', 'oosthuizenp@gmail.com');
$debugMode = isset($_GET['debug']) || getenv('DUCES_MAIL_DEBUG') === '1';
$logFile = __DIR__ . '/mail-debug.log';

function write_mail_log(string $message): void
{
    global $logFile;

    $line = '[' . date('c') . '] ' . $message . PHP_EOL;
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['health'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Mail handler reachable.',
        'smtp_host' => $smtpHost,
        'smtp_port' => $smtpPort,
        'smtp_user' => $smtpUser,
        'from_email' => $fromEmail,
        'to_email' => $toEmail,
        'debug_mode' => $debugMode,
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
    ]);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$rawBody = file_get_contents('php://input');
$payload = [];

if (stripos($contentType, 'application/json') !== false) {
    $payload = json_decode($rawBody, true);
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON payload.',
        ]);
        exit;
    }
} else {
    $payload = $_POST;
}

function clean_text($value): string
{
    $value = is_string($value) ? trim($value) : '';
    $value = strip_tags($value);
    return preg_replace("/[\r\n]+/", ' ', $value) ?? '';
}

function clean_multiline($value): string
{
    $value = is_string($value) ? trim($value) : '';
    $value = strip_tags($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    return preg_replace("/\n{3,}/", "\n\n", $value) ?? '';
}

function escape_html($value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function build_detail_rows(array $details): string
{
    $rows = '';

    foreach ($details as $label => $value) {
        if ($value === '') {
            continue;
        }

        $formattedValue = nl2br(escape_html($value));
        $rows .= '<tr>'
            . '<td style="padding:10px 14px;border:1px solid #e6dde0;background:#f8f3f4;font-weight:700;color:#2d1a1f;width:180px;">' . escape_html($label) . '</td>'
            . '<td style="padding:10px 14px;border:1px solid #e6dde0;color:#2d1a1f;">' . $formattedValue . '</td>'
            . '</tr>';
    }

    return $rows;
}

function fail_response(int $statusCode, string $message): void
{
    http_response_code($statusCode);
    write_mail_log("Request failed with {$statusCode}: {$message}");
    echo json_encode([
        'success' => false,
        'message' => $message,
    ]);
    exit;
}

if ($smtpPass === '') {
    fail_response(500, 'Mail server password is not configured.');
}

$type = clean_text($payload['type'] ?? 'contact');
$honeypot = clean_text($payload['company'] ?? '');

if ($honeypot !== '') {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you.',
    ]);
    exit;
}

$firstName = clean_text($payload['firstName'] ?? '');
$lastName = clean_text($payload['lastName'] ?? '');
$fullName = trim($firstName . ' ' . $lastName);
$legacyName = clean_text($payload['name'] ?? '');
$name = $fullName !== '' ? $fullName : $legacyName;
$email = filter_var(trim((string) ($payload['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$phone = clean_text($payload['phone'] ?? '');
$location = clean_text($payload['location'] ?? '');
$subject = clean_text($payload['subject'] ?? '');
$message = clean_multiline($payload['message'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail_response(400, 'Please provide a valid email address.');
}

$mailSubject = '';
$mailBody = '';
$mailHtml = '';
$replyToName = $name !== '' ? $name : $email;
$sourceLabel = 'Website contact form';

if ($type === 'newsletter') {
    $sourceLabel = 'Newsletter signup';
    $mailSubject = 'Newsletter Sign-Up | Duces Capital Website';
    $mailBody = "A new newsletter signup was received.\n\n"
        . "Source: {$sourceLabel}\n"
        . "Email: {$email}\n";
    $mailHtml = '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#2d1a1f;">'
        . '<h2 style="margin:0 0 18px;color:#2d1a1f;">New newsletter signup</h2>'
        . '<table style="border-collapse:collapse;width:100%;max-width:720px;">'
        . build_detail_rows([
            'Source' => $sourceLabel,
            'Email' => $email,
        ])
        . '</table>'
        . '</div>';
} else {
    if ($name === '' || $message === '') {
        fail_response(400, 'Please complete the required fields.');
    }

    if (stripos($subject, 'Home loan expert callback') !== false) {
        $sourceLabel = 'Apply now form';
        $mailSubject = 'Apply Now | Duces Capital Website';
    } else {
        $sourceLabel = 'Contact form';
        $mailSubject = 'Contact Form | Duces Capital Website';
    }

    $mailBody = "A new website enquiry was received.\n\n"
        . "Source: {$sourceLabel}\n"
        . "Name: {$name}\n"
        . "Email: {$email}\n";

    if ($phone !== '') {
        $mailBody .= "Phone: {$phone}\n";
    }

    if ($location !== '') {
        $mailBody .= "Location: {$location}\n";
    }

    $mailBody .= "\nMessage:\n{$message}\n";

    $mailHtml = '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#2d1a1f;">'
        . '<h2 style="margin:0 0 6px;color:#2d1a1f;">' . escape_html($mailSubject) . '</h2>'
        . '<p style="margin:0 0 18px;color:#6b585d;">A new enquiry was submitted through the website.</p>'
        . '<table style="border-collapse:collapse;width:100%;max-width:720px;margin-bottom:18px;">'
        . build_detail_rows([
            'Source' => $sourceLabel,
            'Name' => $name,
            'Email' => $email,
            'Phone' => $phone,
            'Location' => $location,
            'Subject' => $subject,
        ])
        . '</table>'
        . '<div style="max-width:720px;padding:16px 18px;border:1px solid #e6dde0;background:#fffaf9;">'
        . '<div style="margin:0 0 8px;font-weight:700;color:#2d1a1f;">Message</div>'
        . '<div style="white-space:normal;color:#2d1a1f;">' . nl2br(escape_html($message)) . '</div>'
        . '</div>'
        . '</div>';
}

$mail = new PHPMailer(true);
$smtpTranscript = '';

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';
    if ($debugMode) {
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = static function ($line, $level) use (&$smtpTranscript): void {
            $smtpTranscript .= "[{$level}] {$line}\n";
        };
    }

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail);
    $mail->addReplyTo($email, $replyToName);

    $mail->Subject = $mailSubject;
    $mail->isHTML(true);
    $mail->Body = $mailHtml;
    $mail->AltBody = $mailBody;

    $mail->send();
    write_mail_log("Mail sent successfully to {$toEmail} for type {$type} from {$email}");

    $response = [
        'success' => true,
        'message' => 'Thank you. We will be in touch shortly.',
    ];

    if ($debugMode) {
        $response['debug'] = [
            'to_email' => $toEmail,
            'smtp_host' => $smtpHost,
            'smtp_port' => $smtpPort,
            'transcript' => trim($smtpTranscript),
        ];
    }

    echo json_encode($response);
} catch (Exception $exception) {
    $errorMessage = $mail->ErrorInfo !== '' ? $mail->ErrorInfo : $exception->getMessage();
    write_mail_log("SMTP send failure to {$toEmail}: {$errorMessage}");
    if ($smtpTranscript !== '') {
        write_mail_log("SMTP transcript: " . str_replace(PHP_EOL, ' | ', trim($smtpTranscript)));
    }
    http_response_code(500);
    $response = [
        'success' => false,
        'message' => 'Could not send email. Please try again later.',
    ];

    if ($debugMode) {
        $response['debug'] = [
            'to_email' => $toEmail,
            'smtp_host' => $smtpHost,
            'smtp_port' => $smtpPort,
            'error' => $errorMessage,
            'transcript' => trim($smtpTranscript),
        ];
    }

    echo json_encode($response);
}

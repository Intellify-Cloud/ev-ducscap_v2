[33mcommit 28476772c1fc07f64d126bbaa25568810357612d[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Pieter <oosthuizenp@me.com>
Date:   Mon Jun 29 23:20:59 2026 +0200

    feat: add newsletter honeypot, harden mail config security
    
    - Add hidden honeypot input to newsletter form to filter bot submissions, with client-side check to abort processing if honeypot is populated
    - Refactor mail configuration loading in `send-mail.php` to prioritize values from an external private config file or environment variables, removing hardcoded sensitive credentials from the codebase
    - Add server-side validation to return 500 error if required SMTP password is not configured
    - Update `.gitignore` to exclude `mail-config.php` and `mail-debug.log` to prevent accidental exposure of sensitive data and debug logs

[1mdiff --git a/send-mail.php b/send-mail.php[m
[1mindex 1b5ea2d..199d350 100644[m
[1m--- a/send-mail.php[m
[1m+++ b/send-mail.php[m
[36m@@ -10,16 +10,48 @@[m [mrequire __DIR__ . '/PHPMailer/SMTP.php';[m
 require __DIR__ . '/PHPMailer/Exception.php';[m
 [m
 /*[m
[31m- * Prefer environment variables on the live server. The fallback values keep[m
[31m- * the file easy to test in a shared-hosting setup if env vars are unavailable.[m
[32m+[m[32m * Load private config from a non-public file when available.[m
[32m+[m[32m * On the live server, prefer placing mail-config.php one level above public_html.[m
  */[m
[31m-$smtpHost = getenv('DUCES_SMTP_HOST') ?: 'mail.ducescapital.co.za';[m
[31m-$smtpPort = (int) (getenv('DUCES_SMTP_PORT') ?: 587);[m
[31m-$smtpUser = getenv('DUCES_SMTP_USER') ?: 'noreply@ducescapital.co.za';[m
[31m-$smtpPass = getenv('DUCES_SMTP_PASS') ?: 'H0628Ez7F6b993*';[m
[31m-$fromEmail = getenv('DUCES_FROM_EMAIL') ?: 'noreply@ducescapital.co.za';[m
[31m-$fromName = getenv('DUCES_FROM_NAME') ?: 'Duces Capital (No-Reply)';[m
[31m-$toEmail = getenv('DUCES_CONTACT_TO') ?: 'oosthuizenp@gmail.com';[m
[32m+[m[32m$privateConfigPaths = [[m
[32m+[m[32m    dirname(__DIR__) . '/mail-config.php',[m
[32m+[m[32m    __DIR__ . '/mail-config.php',[m
[32m+[m[32m];[m
[32m+[m[32m$privateConfig = [];[m
[32m+[m
[32m+[m[32mforeach ($privateConfigPaths as $configPath) {[m
[32m+[m[32m    if (is_file($configPath)) {[m
[32m+[m[32m        $loadedConfig = require $configPath;[m
[32m+[m[32m        if (is_array($loadedConfig)) {[m
[32m+[m[32m            $privateConfig = $loadedConfig;[m
[32m+[m[32m            break;[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction config_value(string $key, $default = '')[m
[32m+[m[32m{[m
[32m+[m[32m    global $privateConfig;[m
[32m+[m
[32m+[m[32m    $envValue = getenv($key);[m
[32m+[m[32m    if ($envValue !== false && $envValue !== '') {[m
[32m+[m[32m        return $envValue;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    if (array_key_exists($key, $privateConfig) && $privateConfig[$key] !== '') {[m
[32m+[m[32m        return $privateConfig[$key];[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    return $default;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m$smtpHost = config_value('DUCES_SMTP_HOST', 'mail.ducescapital.co.za');[m
[32m+[m[32m$smtpPort = (int) config_value('DUCES_SMTP_PORT', 587);[m
[32m+[m[32m$smtpUser = config_value('DUCES_SMTP_USER', 'noreply@ducescapital.co.za');[m
[32m+[m[32m$smtpPass = config_value('DUCES_SMTP_PASS');[m
[32m+[m[32m$fromEmail = config_value('DUCES_FROM_EMAIL', 'noreply@ducescapital.co.za');[m
[32m+[m[32m$fromName = config_value('DUCES_FROM_NAME', 'Duces Capital (No-Reply)');[m
[32m+[m[32m$toEmail = config_value('DUCES_CONTACT_TO', 'oosthuizenp@gmail.com');[m
 $debugMode = isset($_GET['debug']) || getenv('DUCES_MAIL_DEBUG') === '1';[m
 $logFile = __DIR__ . '/mail-debug.log';[m
 [m
[36m@@ -122,6 +154,10 @@[m [mfunction fail_response(int $statusCode, string $message): void[m
     exit;[m
 }[m
 [m
[32m+[m[32mif ($smtpPass === '') {[m
[32m+[m[32m    fail_response(500, 'Mail server password is not configured.');[m
[32m+[m[32m}[m
[32m+[m
 $type = clean_text($payload['type'] ?? 'contact');[m
 $honeypot = clean_text($payload['company'] ?? '');[m
 [m

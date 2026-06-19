(function () {
  const root = document.getElementById('deposit-savings-calculator');
  if (!root) return;

  const byId = id => root.querySelector('#' + id);
  const value = id => parseFloat(String(byId(id).value).replace(/[^\d.]/g, '')) || 0;
  const rand = amount => 'R ' + Math.round(Math.max(amount, 0)).toLocaleString('en-ZA');

  function formatCurrencyField(field) {
    const numericValue = field.value.replace(/[^\d]/g, '');
    field.value = numericValue ? Number(numericValue).toLocaleString('en-ZA') : '';
  }

  function formatTimeline(months) {
    if (!Number.isFinite(months)) return 'Contribution required';
    if (months <= 0) return 'Target reached';
    const years = Math.floor(months / 12);
    const remainder = months % 12;
    return [years ? years + (years === 1 ? ' year' : ' years') : '', remainder ? remainder + (remainder === 1 ? ' month' : ' months') : '']
      .filter(Boolean)
      .join(' ');
  }

  function calculate() {
    const propertyPrice = value('mb-d-property');
    const target = propertyPrice * value('mb-d-percent') / 100;
    const current = value('mb-d-current');
    const monthlyContribution = value('mb-d-monthly');
    const monthlyRate = value('mb-d-rate') / 100 / 12;
    const remaining = Math.max(target - current, 0);
    let balance = current;
    let months = 0;
    const maxMonths = 100 * 12;

    while (balance < target && months < maxMonths && (monthlyContribution > 0 || monthlyRate > 0)) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      months++;
    }

    if (balance < target) months = Infinity;

    byId('mb-d-target').textContent = rand(target);
    byId('mb-d-remaining').textContent = rand(remaining);
    byId('mb-d-timeline').textContent = formatTimeline(months);

    if (Number.isFinite(months)) {
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + months);
      byId('mb-d-date').textContent = months <= 0
        ? 'Already reached'
        : targetDate.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
    } else {
      byId('mb-d-date').textContent = '—';
    }

    const progress = target > 0 ? Math.min(current / target * 100, 100) : 0;
    byId('mb-d-progress').style.width = progress + '%';
  }

  root.querySelectorAll('[data-currency-input]').forEach(field => {
    field.addEventListener('input', () => formatCurrencyField(field));
  });
  byId('mb-d-calc-btn').addEventListener('click', calculate);
})();

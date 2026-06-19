(function () {
  const root = document.getElementById('bond-affordability-calculator');
  if (!root) return;

  const byId = id => root.querySelector('#' + id);
  const value = id => parseFloat(String(byId(id).value).replace(/\s/g, '')) || 0;
  const number = amount => Math.round(Math.max(amount, 0)).toLocaleString('en-ZA');
  const rand = amount => 'R ' + number(amount);

  function formatCurrencyField(field) {
    const numericValue = field.value.replace(/[^\d]/g, '');
    field.value = numericValue ? Number(numericValue).toLocaleString('en-ZA') : '';
  }

  function syncSurplus() {
    const surplus = Math.max(value('mb-a-net') - value('mb-a-expenses'), 0);
    byId('mb-a-surplus').value = surplus > 0 ? number(surplus) : '';
    return surplus;
  }

  function calculateAffordability() {
    const grossCap = value('mb-a-gross') * 0.3;
    const surplus = syncSurplus();
    const maxMonthly = Math.min(grossCap, surplus);
    const years = parseInt(byId('mb-a-years').value, 10) || 20;
    const monthlyRate = value('mb-a-rate') / 100 / 12;
    const periods = years * 12;
    const qualify = monthlyRate === 0
      ? maxMonthly * periods
      : (maxMonthly / monthlyRate) * (1 - 1 / Math.pow(1 + monthlyRate, periods));

    byId('mb-a-qualify').textContent = rand(qualify);
    byId('mb-a-gross-cap').textContent = rand(grossCap);
    byId('mb-a-surplus-result').textContent = rand(surplus);
    byId('mb-a-monthly').textContent = rand(maxMonthly);
  }

  root.querySelectorAll('[data-currency-input]').forEach(field => {
    field.addEventListener('input', function () {
      formatCurrencyField(field);
      if (field.id === 'mb-a-net' || field.id === 'mb-a-expenses') syncSurplus();
    });
  });

  byId('mb-a-calc-btn').addEventListener('click', calculateAffordability);
  syncSurplus();
})();

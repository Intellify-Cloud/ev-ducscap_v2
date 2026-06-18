(function () {
  const root = document.getElementById('bond-repayment-calculator');
  if (!root) return;

  const byId = id => root.querySelector('#' + id);
  const value = id => parseFloat(String(byId(id).value).replace(/\s/g, '')) || 0;
  const rand = amount => 'R ' + Math.round(Math.max(amount, 0)).toLocaleString('en-ZA');

  function formatCurrencyField(field) {
    const numericValue = field.value.replace(/[^\d]/g, '');
    field.value = numericValue ? Number(numericValue).toLocaleString('en-ZA') : '';
  }

  function syncTicks() {
    const activeIndex = (parseInt(byId('mb-r-years').value, 10) - 5) / 5;
    root.querySelectorAll('[data-mb-repayment-ticks] span').forEach((tick, index) => {
      tick.classList.toggle('active', index === activeIndex);
    });
  }

  function calculateRepayment() {
    const principal = Math.max(value('mb-r-price') - value('mb-r-deposit'), 0);
    const years = parseInt(byId('mb-r-years').value, 10) || 20;
    const monthlyRate = value('mb-r-rate') / 100 / 12;
    const periods = years * 12;
    const monthly = principal <= 0
      ? 0
      : monthlyRate === 0
        ? principal / periods
        : principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / (Math.pow(1 + monthlyRate, periods) - 1);
    const total = monthly * periods;

    byId('mb-r-monthly').textContent = rand(monthly);
    byId('mb-r-principal').textContent = rand(principal);
    byId('mb-r-total').textContent = rand(total);
    byId('mb-r-interest').textContent = rand(total - principal);
  }

  root.querySelectorAll('[data-currency-input]').forEach(field => {
    field.addEventListener('input', () => formatCurrencyField(field));
  });
  byId('mb-r-years').addEventListener('input', syncTicks);
  byId('mb-r-calc-btn').addEventListener('click', calculateRepayment);
  syncTicks();
})();

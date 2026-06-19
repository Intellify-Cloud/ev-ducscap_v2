(function () {
  const root = document.getElementById('extra-repayment-calculator');
  if (!root) return;

  const byId = id => root.querySelector('#' + id);
  const value = id => parseFloat(String(byId(id).value).replace(/\s/g, '')) || 0;
  const rand = amount => 'R ' + Math.round(Math.max(amount, 0)).toLocaleString('en-ZA');

  function formatCurrencyField(field) {
    const numericValue = field.value.replace(/[^\d]/g, '');
    field.value = numericValue ? Number(numericValue).toLocaleString('en-ZA') : '';
  }

  function calculateExtraRepayment() {
    const principal = value('mb-e-debt');
    const years = parseInt(byId('mb-e-term').value, 10) || 20;
    const monthlyRate = value('mb-e-rate') / 100 / 12;
    const monthlyRepayment = value('mb-e-monthly');
    const overpaymentType = byId('mb-e-overpayment-type').value;
    const overpaymentAmount = value('mb-e-overpayment');

    if (principal <= 0 || monthlyRepayment <= 0) {
      byId('mb-e-total-loan').textContent = rand(0);
      byId('mb-e-total-monthly').textContent = rand(0);
      byId('mb-e-term-reduced').textContent = '0 years';
      byId('mb-e-amount-reduced').textContent = rand(0);
      return;
    }

    // Calculate original total (no overpayment)
    const originalPeriods = years * 12;
    const originalTotal = monthlyRepayment * originalPeriods;

    // Calculate with overpayment
    let balance = principal;
    let periodsWithExtra = 0;
    const maxPeriods = 50 * 12; // cap at 50 years to prevent infinite loop

    if (overpaymentType === 'once' && overpaymentAmount > 0) {
      // Once-off: subtract from principal immediately
      balance = Math.max(balance - overpaymentAmount, 0);
    }

    const extraMonthly = (overpaymentType === 'recurring') ? overpaymentAmount : 0;

    while (balance > 0 && periodsWithExtra < maxPeriods) {
      const interest = balance * monthlyRate;
      const principalPaid = (monthlyRepayment + extraMonthly) - interest;
      if (principalPaid <= 0) break; // payment doesn't cover interest
      balance -= principalPaid;
      periodsWithExtra++;
    }

    const newYears = Math.ceil(periodsWithExtra / 12);
    const termReduced = Math.max(years - newYears, 0);
    const newTotal = (monthlyRepayment * periodsWithExtra) + (overpaymentType === 'once' ? overpaymentAmount : 0);
    const amountReduced = Math.max(originalTotal - newTotal, 0);

    byId('mb-e-total-loan').textContent = rand(originalTotal);
    byId('mb-e-total-monthly').textContent = rand(monthlyRepayment + extraMonthly);
    byId('mb-e-term-reduced').textContent = termReduced + ' years';
    byId('mb-e-amount-reduced').textContent = rand(amountReduced);
  }

  root.querySelectorAll('[data-currency-input]').forEach(field => {
    field.addEventListener('input', () => formatCurrencyField(field));
    field.addEventListener('blur', () => formatCurrencyField(field));
  });

  byId('mb-e-calc-btn').addEventListener('click', calculateExtraRepayment);
})();

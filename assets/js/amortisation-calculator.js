(function () {
  const root = document.getElementById('amortisation-calculator');
  if (!root) return;

  const byId = id => root.querySelector('#' + id);
  const value = id => parseFloat(String(byId(id).value).replace(/[^\d.]/g, '')) || 0;
  const rand = amount => 'R ' + Math.round(Math.max(amount, 0)).toLocaleString('en-ZA');

  function formatCurrencyField(field) {
    const numericValue = field.value.replace(/[^\d]/g, '');
    field.value = numericValue ? Number(numericValue).toLocaleString('en-ZA') : '';
  }

  function calculate() {
    const principal = value('mb-am-loan');
    const years = parseInt(byId('mb-am-years').value, 10) || 20;
    const monthlyRate = value('mb-am-rate') / 100 / 12;
    const periods = years * 12;
    const monthly = principal <= 0
      ? 0
      : monthlyRate === 0
        ? principal / periods
        : principal * monthlyRate * Math.pow(1 + monthlyRate, periods) / (Math.pow(1 + monthlyRate, periods) - 1);

    const total = monthly * periods;
    byId('mb-am-monthly').textContent = rand(monthly);
    byId('mb-am-interest').textContent = rand(total - principal);
    byId('mb-am-total').textContent = rand(total);

    const body = byId('mb-am-schedule-body');
    body.textContent = '';
    let balance = principal;

    for (let year = 1; year <= years && balance > 0.01; year++) {
      const opening = balance;
      let principalPaid = 0;
      let interestPaid = 0;

      for (let month = 0; month < 12 && balance > 0.01; month++) {
        const interest = balance * monthlyRate;
        const principalPart = Math.min(Math.max(monthly - interest, 0), balance);
        interestPaid += interest;
        principalPaid += principalPart;
        balance -= principalPart;
      }

      const row = document.createElement('tr');
      [year, rand(opening), rand(principalPaid), rand(interestPaid), rand(balance)].forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        row.appendChild(cell);
      });
      body.appendChild(row);
    }

    byId('mb-am-schedule').hidden = principal <= 0;
  }

  root.querySelectorAll('[data-currency-input]').forEach(field => {
    field.addEventListener('input', () => formatCurrencyField(field));
  });
  byId('mb-am-calc-btn').addEventListener('click', calculate);
})();

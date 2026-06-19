(function () {
  const VAT = 0.15;
  const formatRand = value => "R " + Math.round(value).toLocaleString("en-ZA");
  const parseCurrency = value => parseFloat(String(value || "").replace(/[^\d]/g, "")) || 0;
  const formatCurrencyField = field => {
    const numericValue = field.value.replace(/[^\d]/g, "");
    field.value = numericValue ? numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
  };
  const setValue = (id, value) => {
    const node = document.getElementById(id);
    if (node) node.textContent = formatRand(value);
  };

  function calcTransferDuty(price) {
    if (price <= 1210000) return 0;
    if (price <= 1663800) return (price - 1210000) * 0.03;
    if (price <= 2329300) return 13614 + (price - 1663800) * 0.06;
    if (price <= 2994800) return 53544 + (price - 2329300) * 0.08;
    if (price <= 13310000) return 106784 + (price - 2994800) * 0.11;
    return 1241456 + (price - 13310000) * 0.13;
  }

  function calcTransferAttorneyFee(price) {
    if (price <= 0) return 0;
    if (price <= 100000) return 6640;
    if (price <= 500000) return 6640 + Math.ceil((price - 100000) / 50000) * 1060;
    if (price <= 1000000) return 15120 + Math.ceil((price - 500000) / 100000) * 2050;
    if (price <= 5000000) return 25370 + Math.ceil((price - 1000000) / 200000) * 2050;
    return 66370 + Math.ceil((price - 5000000) / 1000000) * 5160;
  }

  function calcBondAttorneyFee(loan) {
    if (loan <= 0) return 0;
    if (loan <= 100000) return 6640;
    if (loan <= 500000) return 6640 + Math.ceil((loan - 100000) / 50000) * 1060;
    if (loan <= 1000000) return 15120 + Math.ceil((loan - 500000) / 100000) * 2050;
    if (loan <= 5000000) return 25370 + Math.ceil((loan - 1000000) / 200000) * 2050;
    return 66370 + Math.ceil((loan - 5000000) / 1000000) * 5160;
  }

  function calcDeedsTransfer(price) {
    if (price <= 0) return 0;
    if (price <= 100000) return 50;
    if (price <= 200000) return 114;
    if (price <= 300000) return 727;
    if (price <= 600000) return 956;
    if (price <= 800000) return 1346;
    if (price <= 1000000) return 1546;
    if (price <= 2000000) return 1738;
    if (price <= 4000000) return 2408;
    if (price <= 6000000) return 2922;
    if (price <= 8000000) return 3480;
    if (price <= 10000000) return 4068;
    if (price <= 15000000) return 4844;
    if (price <= 20000000) return 5818;
    return 7751;
  }

  function calcDeedsBond(loan) {
    if (loan <= 0) return 0;
    if (loan <= 150000) return 561;
    if (loan <= 300000) return 727;
    if (loan <= 600000) return 956;
    if (loan <= 800000) return 1346;
    if (loan <= 1000000) return 1546;
    if (loan <= 2000000) return 1738;
    if (loan <= 4000000) return 2408;
    if (loan <= 6000000) return 2922;
    if (loan <= 8000000) return 3480;
    if (loan <= 10000000) return 4068;
    if (loan <= 15000000) return 4844;
    if (loan <= 20000000) return 5818;
    if (loan <= 30000000) return 6781;
    return 9690;
  }

  function calculateTransferCosts() {
    const price = parseCurrency(document.getElementById("mb-t-purchase-price").value);
    const loan = parseCurrency(document.getElementById("mb-t-loan-amount").value);
    const sellerVat = document.getElementById("mb-t-seller-vat").value;

    const bondAttyInclVat = calcBondAttorneyFee(loan) * (1 + VAT);
    const bankInitFee = loan > 0 ? 6037.50 : 0;
    const deedsBond = calcDeedsBond(loan);
    const pettiesBond = loan > 0 ? 2200 : 0;
    const bondTotal = bondAttyInclVat + bankInitFee + deedsBond + pettiesBond;

    const transferAttyInclVat = calcTransferAttorneyFee(price) * (1 + VAT);
    const transferDuty = sellerVat === "yes" ? 0 : calcTransferDuty(price);
    const deedsTransfer = calcDeedsTransfer(price);
    const pettiesTransfer = price > 0 ? 2200 : 0;
    const transferTotal = transferAttyInclVat + transferDuty + deedsTransfer + pettiesTransfer;
    const grandTotal = (loan > 0 ? bondTotal : 0) + transferTotal;

    setValue("mb-t-total", grandTotal);
    setValue("mb-t-bond-total", loan > 0 ? bondTotal : 0);
    setValue("mb-t-bond-atty", loan > 0 ? bondAttyInclVat : 0);
    setValue("mb-t-bank-init", bankInitFee);
    setValue("mb-t-deeds-bond", loan > 0 ? deedsBond : 0);
    setValue("mb-t-petties-bond", loan > 0 ? pettiesBond : 0);
    setValue("mb-t-transfer-total", transferTotal);
    setValue("mb-t-transfer-atty", transferAttyInclVat);
    setValue("mb-t-transfer-duty", transferDuty);
    setValue("mb-t-deeds-transfer", deedsTransfer);
    setValue("mb-t-petties-transfer", pettiesTransfer);

    document.getElementById("mb-t-duty-label").textContent =
      sellerVat === "yes" ? "Transfer duty not applicable for VAT vendor **" : "Transfer duty **";
    document.getElementById("mb-t-results-card").classList.add("mb-transfer-result--visible");
  }

  document.querySelectorAll("#mzansi-transfer-cost-calculator [data-currency-input]").forEach(field => {
    field.addEventListener("input", () => formatCurrencyField(field));
    field.addEventListener("blur", () => formatCurrencyField(field));
  });

  document.getElementById("mb-t-calc-btn").addEventListener("click", calculateTransferCosts);
})();

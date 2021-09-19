

export const convertToCurrency = (number) => {
    var n = number.toFixed(0);
    var currency = new Intl.NumberFormat('de-DE').format(n) + "₫";
    return currency;
}
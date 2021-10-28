export default function currencyFormatter(price) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

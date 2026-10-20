// GEMINI-MYTJ: Restore shared service-card price normalization.
export const getServiceCardPricing = (item) => {
  if (!item) return { displayPrice: 0, originalPrice: 0, discountText: "" };
  const price = item.base_price ?? item.price ?? 0;
  const discount = item.discount ?? 0;
  const discountType = item.discount_type;

  let discountedPrice = price;
  let discountText = "";
  if (discount > 0) {
    if (discountType === "percent" || discountType === "percentage") {
      discountedPrice = price - (price * discount) / 100;
      discountText = `${discount}% off`;
    } else {
      discountedPrice = Math.max(0, price - discount);
      discountText = `${discount} off`;
    }
  }

  return {
    displayPrice: discountedPrice,
    originalPrice: price,
    discountText,
  };
};

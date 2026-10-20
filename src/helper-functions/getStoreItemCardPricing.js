// GEMINI-MYTJ: Restore shared pricing normalization used by store cards.
export const getStoreItemCardPricing = (item) => {
  if (!item) return { displayPrice: 0, originalPrice: 0, showStrike: false };
  const price = item.price ?? item.base_price ?? 0;
  const discount = item.discount ?? 0;
  const discountType = item.discount_type;

  let discountedPrice = price;
  if (discount > 0) {
    if (discountType === "percent" || discountType === "percentage") {
      discountedPrice = price - (price * discount) / 100;
    } else {
      discountedPrice = Math.max(0, price - discount);
    }
  }

  const showStrike = discount > 0 && discountedPrice < price;
  return {
    displayPrice: discountedPrice,
    originalPrice: price,
    showStrike,
  };
};

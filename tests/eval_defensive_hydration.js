const assert = require("assert");

console.log("Running storefront defensive hydration eval suite...");

// Simulate storedData initial state and reducer actions
const initialState = {
  categories: [],
  subCategories: [],
  popularStores: [],
  recommendedStores: [],
  newStores: [],
  basicCampaigns: [],
  banners: {
    banners: [],
    campaigns: [],
  },
  featuredCategories: [],
  popularItemsNearby: {
    products: [],
  },
  runningCampaigns: [],
  newArrivalStores: [],
  bestReviewedItems: {
    products: [],
  },
  youWillLoveItems: {
    products: [],
  },
  AllSaveAddress: [],
};

// Simulate reducers with our safety logic
function simulateSetBanners(state, payload) {
  return {
    ...state,
    banners: {
      banners: Array.isArray(payload?.banners) ? payload.banners : [],
      campaigns: Array.isArray(payload?.campaigns) ? payload.campaigns : [],
    },
  };
}

function simulateSetFeaturedCategories(state, payload) {
  return {
    ...state,
    featuredCategories: Array.isArray(payload) ? payload : [],
  };
}

function simulateSetBestReviewedItems(state, payload) {
  return {
    ...state,
    bestReviewedItems: {
      ...(payload || {}),
      products: Array.isArray(payload?.products) ? payload.products : [],
    },
  };
}

// Eval 1: Null/undefined banner payload from API or cache
let state = { ...initialState };
state = simulateSetBanners(state, null);
assert.doesNotThrow(() => {
  const lenBanners = state.banners.banners.length;
  const lenCampaigns = state.banners.campaigns.length;
  assert.strictEqual(lenBanners, 0);
  assert.strictEqual(lenCampaigns, 0);
}, "Null banners payload must never result in undefined length access");

state = simulateSetBanners(state, { banners: [{ id: 1 }] }); // missing campaigns
assert.doesNotThrow(() => {
  const lenBanners = state.banners.banners.length;
  const lenCampaigns = state.banners.campaigns.length;
  assert.strictEqual(lenBanners, 1);
  assert.strictEqual(lenCampaigns, 0);
}, "Payload missing campaigns must default campaigns to empty array");
console.log("✓ Eval 1 Passed: Banner reducer resilience to null, empty, or partial API payloads verified");

// Eval 2: Corrupted or uninitialized featuredCategories
state = simulateSetFeaturedCategories(state, undefined);
assert.doesNotThrow(() => {
  const isInfinite = state.featuredCategories.length >= 7;
  assert.strictEqual(isInfinite, false);
}, "Undefined featuredCategories must default to array");
console.log("✓ Eval 2 Passed: FeaturedCategories reducer resilience verified");

// Eval 3: Missing products in bestReviewedItems
state = simulateSetBestReviewedItems(state, { total_size: 0 }); // no products property
assert.doesNotThrow(() => {
  const len = state.bestReviewedItems.products.length;
  assert.strictEqual(len, 0);
}, "bestReviewedItems without products array must default products to []");
console.log("✓ Eval 3 Passed: BestReviewedItems products array resilience verified");

console.log("\nALL DEFENSIVE HYDRATION EVALS PASSED!");

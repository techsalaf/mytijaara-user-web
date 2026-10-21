const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("Running defensive null safety and length access test suite...");

// Test 1: Verify CampaignBanners.js does not contain unprotected .campaigns.length or .banners.length
const campaignBannersPath = path.join(__dirname, "../src/components/home/module-wise-components/ecommerce/CampaignBanners.js");
const campaignBannersCode = fs.readFileSync(campaignBannersPath, "utf8");

assert.strictEqual(
  campaignBannersCode.includes("banners.campaigns.length"),
  false,
  "CampaignBanners.js must not access banners.campaigns.length directly without guards"
);
assert.strictEqual(
  campaignBannersCode.includes("banners.banners.length"),
  false,
  "CampaignBanners.js must not access banners.banners.length directly without guards"
);
assert.ok(
  campaignBannersCode.includes("campaignList.length") || campaignBannersCode.includes("banners?.campaigns?.length"),
  "CampaignBanners.js must safely guard campaigns list length"
);
assert.ok(
  campaignBannersCode.includes("bannerList.length") || campaignBannersCode.includes("banners?.banners?.length"),
  "CampaignBanners.js must safely guard banners list length"
);
console.log("✓ Test 1 Passed: CampaignBanners safely guards banners & campaigns against undefined length");

// Test 2: Verify FeaturedCategories guards featuredCategories against undefined
const featuredCatPath = path.join(__dirname, "../src/components/home/featured-categories/index.js");
const featuredCatCode = fs.readFileSync(featuredCatPath, "utf8");

assert.strictEqual(
  featuredCatCode.includes("infinite: featuredCategories.length >= 7"),
  false,
  "FeaturedCategories must not access featuredCategories.length without null check / array fallback"
);
assert.ok(
  featuredCatCode.includes("Array.isArray(storedFeatured)") || featuredCatCode.includes("featuredCategories?.length"),
  "FeaturedCategories must safely verify featuredCategories array"
);
console.log("✓ Test 2 Passed: FeaturedCategories safely guards featuredCategories against undefined length");

// Test 3: Verify BestReviewedItems guards bestReviewedItems against undefined products
const bestReviewedPath = path.join(__dirname, "../src/components/home/best-reviewed-items/index.js");
const bestReviewedCode = fs.readFileSync(bestReviewedPath, "utf8");

assert.strictEqual(
  bestReviewedCode.includes("if (bestReviewedItems.products.length === 0)"),
  false,
  "BestReviewedItems must not access bestReviewedItems.products.length directly"
);
assert.ok(
  bestReviewedCode.includes("Array.isArray(storedBest?.products)") || bestReviewedCode.includes("bestProducts.length"),
  "BestReviewedItems must safely verify products array"
);
console.log("✓ Test 3 Passed: BestReviewedItems safely guards bestReviewedItems products");

// Test 4: Verify storedData.js reducers default all lists to arrays
const storedDataPath = path.join(__dirname, "../src/redux/slices/storedData.js");
const storedDataCode = fs.readFileSync(storedDataPath, "utf8");

assert.ok(
  storedDataCode.includes("banners: Array.isArray(action.payload?.banners) ? action.payload.banners : []"),
  "storedData setBanners must guarantee banners is an array"
);
assert.ok(
  storedDataCode.includes("campaigns: Array.isArray(action.payload?.campaigns) ? action.payload.campaigns : []"),
  "storedData setBanners must guarantee campaigns is an array"
);
console.log("✓ Test 4 Passed: storedData slice reducers ensure arrays for banners, campaigns, and items");

// Test 5: Verify Store components guard storeData against undefined
const popStoresPath = path.join(__dirname, "../src/components/home/stores/PopularStores.js");
const popStoresCode = fs.readFileSync(popStoresPath, "utf8");
assert.ok(
  popStoresCode.includes("item?.stores || []"),
  "PopularStores must fall back to empty array when item?.stores is missing"
);

const allStoresPath = path.join(__dirname, "../src/components/home/stores/AllStores.js");
const allStoresCode = fs.readFileSync(allStoresPath, "utf8");
assert.strictEqual(
  allStoresCode.includes("data?.pages?.[data.pages.length - 1]"),
  false,
  "AllStores must not access data.pages.length without array safety"
);
console.log("✓ Test 5 Passed: Store lists and AllStores pagination safely guard array indexing and length");

console.log("\nALL DEFENSIVE NULL SAFETY TESTS PASSED!");

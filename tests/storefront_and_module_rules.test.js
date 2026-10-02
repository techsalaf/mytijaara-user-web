const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("Running storefront and module rules test suite...");

// Test 1: Check GEMINI-MYTJ marker in all modified core files
const modifiedFiles = [
  "middleware.js",
  "pages/index.js",
  "src/api-manage/MainApi.js",
  "src/components/checkout/item-checkout/index.js",
  "src/components/header/new-navbar/MobileNavBar.js",
  "src/components/header/new-navbar/NewNavBar.js",
  "src/components/header/second-navbar/ModuleWiseNav.js",
  "src/components/home/HomePageComponents.js",
  "src/components/layout/MainLayout.js",
  "src/components/logo/CustomLogo.js",
  "src/components/module-select/ModuleChecker.js",
  "src/components/module-wise-layout/index.js",
  "src/components/route-guard/ZoneGuard.js",
  "src/helper-functions/getCurrentModuleType.js",
  "src/helper-functions/getModuleId.js",
  "src/redux/slices/utils.js",
  "src/components/footer/footer-middle/AppLinks.js",
  "src/components/home/MobileAppBanner.tsx",
];

for (const relPath of modifiedFiles) {
  const fullPath = path.join(__dirname, "..", relPath);
  assert.ok(fs.existsSync(fullPath), `File must exist: ${relPath}`);
  const content = fs.readFileSync(fullPath, "utf8");
  assert.ok(
    content.includes("GEMINI-MYTJ"),
    `File ${relPath} must contain GEMINI-MYTJ marker`
  );
}
console.log("✓ Test 1 Passed: All 18 modified core files contain GEMINI-MYTJ marker");

// Test 2: Verify middleware root redirect logic
const middlewareContent = fs.readFileSync(
  path.join(__dirname, "..", "middleware.js"),
  "utf8"
);
assert.ok(
  middlewareContent.includes('pathname === "/"'),
  "middleware must intercept root pathname"
);
assert.ok(
  middlewareContent.includes("/home") && middlewareContent.includes("shop"),
  "middleware must redirect root to /home defaulting to shop"
);
console.log("✓ Test 2 Passed: middleware.js redirects root to /home with shop default");

// Test 3: Verify pages/index.js SSR redirect logic
const indexContent = fs.readFileSync(
  path.join(__dirname, "..", "pages/index.js"),
  "utf8"
);
assert.ok(
  indexContent.includes('destination: `/home?module=${selectedModuleCookie}`'),
  "pages/index.js getServerSideProps must redirect to /home with selected/default module"
);
console.log("✓ Test 3 Passed: pages/index.js SSR redirects to storefront");

// Test 4: Verify ZoneGuard shop default instead of bouncing to root
const zoneGuardContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/route-guard/ZoneGuard.js"),
  "utf8"
);
assert.ok(
  zoneGuardContent.includes('defaultIdentifier = "shop"') ||
  zoneGuardContent.includes("module: defaultIdentifier"),
  "ZoneGuard must default to shop instead of kicking visitors to /"
);
console.log("✓ Test 4 Passed: ZoneGuard allows unlocated browsing with shop default");

// Test 5: Verify ModuleChecker defaulting to shop
const moduleCheckerContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/module-select/ModuleChecker.js"),
  "utf8"
);
assert.ok(
  moduleCheckerContent.includes('item?.slug === "shop" || item?.module_type === "ecommerce"'),
  "ModuleChecker must default to shop / ecommerce when no module in URL/storage"
);
console.log("✓ Test 5 Passed: ModuleChecker auto-selects Shop");

// Test 6: Verify hyperlocal modules check (food / grocery)
const newNavBarContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/header/new-navbar/NewNavBar.js"),
  "utf8"
);
assert.ok(
  newNavBarContent.includes('mod?.module_type === "food" || mod?.module_type === "grocery"'),
  "NewNavBar must flag food and grocery as hyperlocal requiring location"
);
assert.ok(
  newNavBarContent.includes("setOpenLocationModal(true)"),
  "NewNavBar must trigger setOpenLocationModal for unlocated hyperlocal module switch"
);

const mobileNavBarContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/header/new-navbar/MobileNavBar.js"),
  "utf8"
);
assert.ok(
  mobileNavBarContent.includes('item?.module_type === "food" || item?.module_type === "grocery"'),
  "MobileNavBar must flag food and grocery as hyperlocal requiring location"
);
assert.ok(
  mobileNavBarContent.includes("setOpenLocationModal(true)"),
  "MobileNavBar must trigger setOpenLocationModal for unlocated hyperlocal module switch"
);
console.log("✓ Test 6 Passed: Hyperlocal modules (food/grocery) require location and prompt modal");

// Test 7: Verify checkout requires delivery address for delivery orders
const checkoutContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/checkout/item-checkout/index.js"),
  "utf8"
);
assert.ok(
  checkoutContent.includes('orderType === "delivery" || orderType === "schedule_order"'),
  "Checkout must check orderType for delivery"
);
assert.ok(
  checkoutContent.includes("hasDeliveryAddress") && checkoutContent.includes("setOpenAddressModal(true)"),
  "Checkout must block submission and open address modal when delivery address is missing"
);
// Test 8: Verify direct APK download handling without broken intents
const appLinksContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/footer/footer-middle/AppLinks.js"),
  "utf8"
);
assert.ok(
  appLinksContent.includes("isDirectApk") && appLinksContent.includes(".apk"),
  "AppLinks must detect direct APK URLs and trigger direct download"
);

const mobileAppBannerContent = fs.readFileSync(
  path.join(__dirname, "..", "src/components/home/MobileAppBanner.tsx"),
  "utf8"
);
assert.ok(
  mobileAppBannerContent.includes("isDirectApk") && mobileAppBannerContent.includes(".apk"),
  "MobileAppBanner must handle direct APK URLs directly without broken package intents"
);
console.log("✓ Test 8 Passed: Direct APK download handling verified in AppLinks and MobileAppBanner");

console.log("\nALL GATE TESTS PASSED SUCCESSFULLY!");

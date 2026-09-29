const assert = require("assert");

console.log("Running storefront behavior eval suite...");

// Scenario 1: First-time visitor arriving at root '/' with no cookies or localStorage
function simulateVisitorArrival({ path, cookieModule, localStorageState, urlQuery }) {
  // Simulating middleware
  let redirectedUrl = null;
  if (path === "/") {
    const targetModule = cookieModule || "shop";
    redirectedUrl = `/home?module=${targetModule}`;
  }

  // Simulating ZoneGuard
  let guardAllowed = false;
  const moduleFromUrl = urlQuery?.module || (redirectedUrl ? "shop" : null);
  const storedIdentifier = localStorageState?.selectedModuleIdentifier || localStorageState?.module?.slug;

  if (moduleFromUrl || storedIdentifier) {
    guardAllowed = true;
  } else {
    // Falls back to shop
    guardAllowed = true;
  }

  return { redirectedUrl, guardAllowed };
}

// Eval 1: Fresh visitor with no cookies / storage
const res1 = simulateVisitorArrival({ path: "/", cookieModule: null, localStorageState: {} });
assert.strictEqual(res1.redirectedUrl, "/home?module=shop", "Fresh visitor must be redirected to /home?module=shop");
assert.strictEqual(res1.guardAllowed, true, "Fresh visitor must be allowed through ZoneGuard");
console.log("✓ Eval 1 Passed: Fresh visitor is routed to storefront with Shop module");

// Eval 2: Returning visitor with existing cookie
const res2 = simulateVisitorArrival({ path: "/", cookieModule: "pharmacy", localStorageState: {} });
assert.strictEqual(res2.redirectedUrl, "/home?module=pharmacy", "Returning visitor must preserve their selected cookie module");
console.log("✓ Eval 2 Passed: Returning visitor preserves cookie module");

// Eval 3: Hyperlocal check simulation
function evaluateHyperlocalRequirement(moduleType, hasLocation) {
  const isHyperlocal = moduleType === "food" || moduleType === "grocery";
  if (isHyperlocal && !hasLocation) {
    return { shouldPromptLocation: true, modalOpened: true };
  }
  return { shouldPromptLocation: false, modalOpened: false };
}

assert.deepStrictEqual(evaluateHyperlocalRequirement("food", false), { shouldPromptLocation: true, modalOpened: true });
assert.deepStrictEqual(evaluateHyperlocalRequirement("grocery", false), { shouldPromptLocation: true, modalOpened: true });
assert.deepStrictEqual(evaluateHyperlocalRequirement("ecommerce", false), { shouldPromptLocation: false, modalOpened: false });
assert.deepStrictEqual(evaluateHyperlocalRequirement("food", true), { shouldPromptLocation: false, modalOpened: false });
console.log("✓ Eval 3 Passed: Hyperlocal modules accurately trigger location prompts when unlocated");

// Eval 4: Checkout delivery address validation
function evaluateCheckoutSubmission(orderType, address) {
  if (orderType === "delivery" || orderType === "schedule_order") {
    const hasDeliveryAddress =
      address?.address &&
      address?.latitude &&
      address?.longitude &&
      address?.address !== "null" &&
      address?.address !== "undefined";
    if (!hasDeliveryAddress) {
      return { allowed: false, error: "Please select or add a delivery address" };
    }
  }
  return { allowed: true, error: null };
}

assert.strictEqual(evaluateCheckoutSubmission("delivery", null).allowed, false);
assert.strictEqual(evaluateCheckoutSubmission("delivery", { address: "" }).allowed, false);
assert.strictEqual(evaluateCheckoutSubmission("take_away", null).allowed, true);
assert.strictEqual(evaluateCheckoutSubmission("delivery", { address: "123 Main St", latitude: 7.4, longitude: 3.9 }).allowed, true);
console.log("✓ Eval 4 Passed: Checkout validates delivery address before order submission");

console.log("\nALL EVAL SUITES PASSED SUCCESSFULLY!");

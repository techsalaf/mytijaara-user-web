// GEMINI-MYTJ: Restore the verified-store feature flag helper.
export const isVerifiedStoreEnabled = (configData) => {
  if (!configData) return false;
  return (
    configData?.verified_store_status === 1 ||
    configData?.verified_store_status === "1" ||
    configData?.verified_store_status === true
  );
};

export default isVerifiedStoreEnabled;

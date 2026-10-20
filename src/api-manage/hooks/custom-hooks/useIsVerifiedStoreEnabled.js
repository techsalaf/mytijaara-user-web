import { useSelector } from "react-redux";

// GEMINI-MYTJ: Restore the feature flag hook used by product cards.
const useIsVerifiedStoreEnabled = () => {
  const { configData } = useSelector((state) => state.configData);
  return Boolean(configData?.verified_store_status ?? configData?.verified_store ?? true);
};

export default useIsVerifiedStoreEnabled;

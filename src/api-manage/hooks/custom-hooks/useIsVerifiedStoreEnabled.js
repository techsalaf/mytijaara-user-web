import { useSelector } from "react-redux";

const useIsVerifiedStoreEnabled = () => {
  const { configData } = useSelector((state) => state.configData);
  return Boolean(configData?.verified_store_status ?? configData?.verified_store ?? true);
};

export default useIsVerifiedStoreEnabled;

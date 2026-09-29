import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSelectedModule } from "redux/slices/utils";
import useGetModule from "api-manage/hooks/react-query/useGetModule";
import { getCurrentModuleId } from "helper-functions/getCurrentModuleType";
import toast from "react-hot-toast";
import { setModules } from "redux/slices/configData";
import { getSavedModuleIdentifier, saveModuleParam } from "../../utils/moduleParamManager";

const ModuleChecker = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, refetch } = useGetModule();
  
// useEffect(() => {
//     if (data) {
//       dispatch(setModules(data));
//     }
//   }, [data]);
  // Sync Storage -> URL (keep module param on every route)
  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") return;

    const moduleFromUrl = router.query.module;
    const legacyModuleId = router.query.module_id;

    const storedIdentifier =
      getSavedModuleIdentifier() ||
      JSON.parse(localStorage.getItem("module") || "null")?.slug ||
      JSON.parse(localStorage.getItem("module") || "null")?.id;

    const identifierToUse = moduleFromUrl || legacyModuleId || storedIdentifier;

    if (!identifierToUse) return;

    // Add module if missing, and/or remove legacy module_id
    if (!moduleFromUrl || legacyModuleId) {
      const { module_id: _legacy, ...restQuery } = router.query;
      router.replace(
        {
          pathname: router.pathname,
          query: { ...restQuery, module: String(identifierToUse) },
        },
        undefined,
        { shallow: true, scroll: false }
      );
    }
  }, [router.isReady, router.asPath]);

  // Sync URL -> Storage
  useEffect(() => {
    const moduleIdFromUrl = router.query.module || router.query.module_id;
    const moduleIdFromStorage = getCurrentModuleId();

    if (moduleIdFromUrl && !moduleIdFromStorage) {
      refetch();
    }
  }, [router.query.module, router.query.module_id, refetch]);

  useEffect(() => {
    const moduleIdFromUrl = router.query.module || router.query.module_id;
    const moduleIdFromStorage = getCurrentModuleId();
   
    if (data && moduleIdFromUrl && !moduleIdFromStorage) {
      const moduleIdStr = String(moduleIdFromUrl);
      const selectedModule = data.find(
        (item) =>
          String(item?.slug) === moduleIdStr || String(item?.id) === moduleIdStr
      );
      if (selectedModule) {
        localStorage.setItem("module", JSON.stringify(selectedModule));
        saveModuleParam(selectedModule?.id, selectedModule?.slug);
        dispatch(setSelectedModule(selectedModule));
      } else {
        toast.error("Selected module is not available");
        // GEMINI-MYTJ: Fallback to Shop module instead of bouncing to '/'
        const fallback =
          data.find((item) => item?.slug === "shop" || item?.module_type === "ecommerce") ||
          data[0];
        if (fallback) {
          localStorage.setItem("module", JSON.stringify(fallback));
          saveModuleParam(fallback?.id, fallback?.slug);
          dispatch(setSelectedModule(fallback));
          router.replace(
            { pathname: "/home", query: { module: fallback?.slug || fallback?.id } },
            undefined,
            { shallow: true }
          );
        }
      }
    }
  }, [data, router.query.module, router.query.module_id, dispatch]);

  // GEMINI-MYTJ: When modules load with no module selected in URL or storage, default to Shop
  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") return;
    const moduleIdFromUrl = router.query.module || router.query.module_id;
    const moduleIdFromStorage = getCurrentModuleId();

    if (data?.length > 0 && !moduleIdFromUrl && !moduleIdFromStorage) {
      const defaultModule =
        data.find((item) => item?.slug === "shop" || item?.module_type === "ecommerce") ||
        data[0];
      if (defaultModule) {
        localStorage.setItem("module", JSON.stringify(defaultModule));
        saveModuleParam(defaultModule?.id, defaultModule?.slug);
        dispatch(setSelectedModule(defaultModule));
        const moduleIdentifier = defaultModule?.slug || defaultModule?.id;
        const targetPath = router.pathname === "/" ? "/home" : router.pathname;
        router.replace(
          {
            pathname: targetPath,
            query: { ...router.query, module: String(moduleIdentifier) },
          },
          undefined,
          { shallow: true, scroll: false }
        );
      }
    }
  }, [data, router.isReady, router.query.module, router.query.module_id, dispatch]);

  return null;
};

export default ModuleChecker;

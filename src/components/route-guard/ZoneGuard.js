import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ZoneGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      const moduleFromUrlRaw = router.query.module || router.query.module_id;
      const moduleFromUrl = Array.isArray(moduleFromUrlRaw)
        ? moduleFromUrlRaw[0]
        : moduleFromUrlRaw;
      if (moduleFromUrl) {
        setChecked(true);
        return;
      }
      const safeGetItem = (key) => {
        try {
          return localStorage.getItem(key);
        } catch {
          return null;
        }
      };
      let storedModule = null;
      try {
        storedModule = JSON.parse(safeGetItem("module") || "null");
      } catch {
        storedModule = null;
      }
      const storedIdentifier =
        safeGetItem("selectedModuleIdentifier") ||
        safeGetItem("selectedModuleId") ||
        storedModule?.slug ||
        storedModule?.id;
      // GEMINI-MYTJ: Storefront-first - if no module is stored, default to 'shop' instead of bouncing to '/'
      if (storedIdentifier) {
        setChecked(true);
      } else {
        const defaultIdentifier = "shop";
        router.replace(
          {
            pathname: "/home",
            query: { ...router.query, module: defaultIdentifier },
          },
          undefined,
          { shallow: true }
        );
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

export default ZoneGuard;

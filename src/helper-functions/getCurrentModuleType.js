// GEMINI-MYTJ: Default module type to ecommerce (Shop) if not set
export const getCurrentModuleType = () => {
  if (typeof window !== "undefined") {
    try {
      const parsed = JSON.parse(window.localStorage.getItem("module"));
      if (parsed?.module_type) return parsed.module_type;
    } catch {
      // ignore
    }
    return "ecommerce";
  }
  return "ecommerce";
};

export const getCurrentModuleId = () => {
  if (typeof window !== "undefined") {
    try {
      const parsed = JSON.parse(window.localStorage.getItem("module"));
      if (parsed?.id) return parsed.id;
    } catch {
      // ignore
    }
    return localStorage.getItem("selectedModuleId") || null;
  }
  return null;
};

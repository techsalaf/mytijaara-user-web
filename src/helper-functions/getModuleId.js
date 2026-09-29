// GEMINI-MYTJ: Default to 3 (Shop module) if no module in storage
export const getModuleId = () => {
  if (typeof window !== "undefined") {
    try {
      const parsed = JSON.parse(window.localStorage.getItem("module"));
      if (parsed?.id) return parsed.id;
    } catch {
      // ignore
    }
    const savedId = window.localStorage.getItem("selectedModuleId");
    if (savedId) return savedId;
  }
  return 3;
};

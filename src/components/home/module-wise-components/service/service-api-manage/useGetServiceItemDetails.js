import { useQuery } from "react-query";
import MainApi from "api-manage/MainApi";

// GEMINI-MYTJ: Restore the service item query consumed by bundle cards.
export const useGetServiceItemDetails = ({ id }) => {
  return useQuery(
    ["service-item-details", id],
    async () => {
      if (!id) return null;
      const { data } = await MainApi.get(`/api/v1/service/details/${id}`);
      return data;
    },
    { enabled: Boolean(id) }
  );
};

export default useGetServiceItemDetails;

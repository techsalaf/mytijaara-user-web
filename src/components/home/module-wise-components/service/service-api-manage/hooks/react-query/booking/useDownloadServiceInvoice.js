import { useMutation } from "react-query";
import MainApi from "api-manage/MainApi";

export default function useDownloadServiceInvoice() {
  return useMutation(async (bookingId) => {
    const res = await MainApi.get(`/api/v1/customer/order/generate-invoice?order_id=${bookingId}`, {
      responseType: "blob",
    });
    return res.data;
  });
}

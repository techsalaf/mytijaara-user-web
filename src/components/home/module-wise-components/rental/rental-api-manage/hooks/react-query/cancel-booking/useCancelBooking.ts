import MainApi from "api-manage/MainApi";
import { useMutation } from "react-query";

const cancelBooking = async (payload: any) => {
  const { data } = await MainApi.put("/api/v1/rental/user/trip/cancel-trip", payload);
  return data;
};

const useCancelBooking = () => {
  return useMutation("cancel-trip-booking", cancelBooking);
};

export default useCancelBooking;

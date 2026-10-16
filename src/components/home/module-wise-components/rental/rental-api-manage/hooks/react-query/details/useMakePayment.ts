import MainApi from "api-manage/MainApi";
import { useMutation } from "react-query";

const makePayment = async (payload: any) => {
  const { data } = await MainApi.post("/api/v1/rental/user/trip/payment", payload);
  return data;
};

const useMakePayment = () => {
  return useMutation("make-trip-payment", makePayment);
};

export default useMakePayment;

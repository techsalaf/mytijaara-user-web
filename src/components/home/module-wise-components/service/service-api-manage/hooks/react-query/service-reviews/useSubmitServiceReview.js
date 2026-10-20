// GEMINI-MYTJ: Restore the service booking review mutation used by the review form.
import { useMutation } from "react-query";
import MainApi from "../../../../../../../../api-manage/MainApi";

const submitServiceReview = async (payload) => {
  const { data } = await MainApi.post("/api/v1/service/review", payload);
  return data;
};

export const useSubmitServiceReview = () =>
  useMutation("submit-service-review", submitServiceReview);

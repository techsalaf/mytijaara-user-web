import MainApi from "api-manage/MainApi";
import { useQuery } from "react-query";
import { service_booking_list_api } from "../../../ApiRoutes";

const getServiceBookings = async (params) => {
  const { data } = await MainApi.get(service_booking_list_api, { params });
  return data;
};

export default function useGetServiceBookingList(params, enabled = true) {
  return useQuery(
    ["service-booking-list", params],
    () => getServiceBookings(params),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
}

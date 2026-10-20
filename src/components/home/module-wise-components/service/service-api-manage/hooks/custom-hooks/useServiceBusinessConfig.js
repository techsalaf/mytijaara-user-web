// GEMINI-MYTJ: Restore service booking capability configuration.
export default function useServiceBusinessConfig(configData, storeData) {
  return {
    otpForCompleteServiceEnabled: Boolean(
      configData?.service_booking_otp_status === 1 ||
      configData?.service_booking_otp_status === "1" ||
      configData?.service_booking_otp_status === true ||
      configData?.order_delivery_verification === 1
    ),
  };
}

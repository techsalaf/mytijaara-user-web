export default function useBookingRelation({ isBooking, data } = {}) {
  const isRepeat = Boolean(
    data?.repeat_booking ||
    data?.is_repeat_booking ||
    data?.repeat_booking_type
  );
  const isSub = Boolean(
    data?.parent_id ||
    data?.parent_booking_id ||
    data?.is_sub_booking
  );

  return {
    isParentRepeatBooking: Boolean(isBooking && isRepeat && !isSub),
    isSubBooking: Boolean(isBooking && isSub),
  };
}

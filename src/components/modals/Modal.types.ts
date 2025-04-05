import { Bookings } from "../../api/types";

export interface BookingModalProps {
     closeModal: () => void;
     booking: Bookings | null;
}

export interface NewBookingModalProps {
     closeModal: () => void;
}

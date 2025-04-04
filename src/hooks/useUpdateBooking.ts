import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateBookingById } from '../api/bookings';
import { Bookings, UpdateBookingPayload } from '../api/types';


export const useUpdateBooking = (initialBooking: Bookings | null) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.bookings);
    const [formData, setFormData] = useState<UpdateBookingPayload['updatedData']>({
        date: initialBooking?.date || '',
        time: initialBooking?.time || '',
        num_people: initialBooking?.numPeople || 0,
        status: initialBooking?.status || 'Pending',
    })

    useEffect(() => {
        if (initialBooking) {
            setFormData({
                date: initialBooking.date,
                time: initialBooking.time,
                num_people: initialBooking.numPeople,
                status: initialBooking.status,

            })
        }
    }, [initialBooking])

    const handleStatusChange = (status: string) => {
        setFormData(prev => ({ ...prev, status }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'num_people'
                ? value === ''
                    ? '' // Keep as empty string if cleared
                    : Math.max(1, parseInt(value) || 0) // Ensure minimum of 1
                : value
        }));
    };



    const handleSubmit = async (bookingId: number, onSuccess?: () => void) => {
        try {
            const payload: UpdateBookingPayload = {
                id: bookingId,
                updatedData: formData
            };

            await dispatch(updateBookingById(payload)).unwrap();
            onSuccess?.();
        } catch (err) {
            console.error('Error updating booking:', err);
            throw err;
        }
    };


    return {
        formData,
        loading,
        error,
        handleStatusChange,
        handleInputChange,
        handleSubmit,
    };


}

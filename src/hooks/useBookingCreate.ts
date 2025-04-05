/*
* Booking Create Hook
* This hook is responsible for creating a new booking in the system.
* It provides a function to create a booking and handles the loading and error states.
* It uses the `useDispatch` hook from React Redux to dispatch actions to the Redux store.
* It also uses the `useSelector` hook to access the current state of the bookings.
* The hook returns the `createBooking` function, `loading` state, and `error` state.
*/

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createBooking } from "../api/bookings";
import { Bookings } from "../api/types";
import { useState } from "react";


export const useBookingCreate = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { loading, error } = useSelector((state: RootState) => state.bookings);
     const { id } = useSelector((state: RootState) => state.restaurant);
     const [formData, setFormData] = useState(<Bookings>{});

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;

          if (name.startsWith('customer.')) {
               const fieldName = name.split('.')[1] as keyof Bookings['customer'];
               setFormData(prev => ({
                    ...prev,
                    customer: {
                         ...prev.customer!,
                         [fieldName]: value
                    }
               }));
          } else {
               setFormData(prev => ({
                    ...prev,
                    [name]: name === 'numPeople'
                         ? parseInt(value) || 0
                         : value
               }));
          }
     };

     const handleStatusChange = (status: string) => {
          setFormData(prev => ({ ...prev, status }));
     };


     const createBookingHandler = async (bookingData: Bookings) => {
          await dispatch(createBooking({
               restaurantId: id,
               bookingData
          }));
     };


     const resetForm = () => {
          setFormData({
               id: 0,
               time: '',
               numPeople: 1,
               status: 'Pending',
               customer: {
                    id: 0,
                    name: '',
                    email: '',
                    phone: ''
               }
          });
     };

     return {
          formData,
          handleInputChange,
          handleStatusChange,
          createBookingHandler,
          resetForm,
          loading,
          error
     };
}

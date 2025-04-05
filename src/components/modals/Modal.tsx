import "./modal.component.scss";
import { BookingIcon, CloseIcon, TimeIcon } from "../icons/Icons";
import { useUpdateBooking } from "../../hooks/useUpdateBooking";
import { BookingModalProps, NewBookingModalProps } from "./Modal.types";
import { useBookingCreate } from "../../hooks/useBookingCreate";

export const BookingModal: React.FC<BookingModalProps> = ({
     closeModal,
     booking,
}) => {
     const {
          formData,
          loading,
          error,
          handleStatusChange,
          handleInputChange,
          handleSubmit,
     } = useUpdateBooking(booking);

     const onSave = async () => {
          if (booking) {
               await handleSubmit(booking.id, closeModal);
          }
     };

     return (
          <div className={`modal-overlay show`} onClick={closeModal}>
               <div
                    className="modal-container show"
                    onClick={(e) => e.stopPropagation()}
               >
                    <header className="modal-header">
                         <h4>Manage Booking</h4>
                         <button onClick={closeModal}>
                              <CloseIcon />
                         </button>
                    </header>
                    <div className="modal-body">
                         {error ? (
                              <p className="error">{error}</p>
                         ) : (
                              booking && (
                                   <>
                                        <div className="input-container">
                                             <label htmlFor="date">Date</label>
                                             <input
                                                  type="date"
                                                  name="date"
                                                  id="date"
                                                  className="date"
                                                  value={formData.date} // Controlled value
                                                  onChange={handleInputChange}
                                             />
                                             <span className="date-icon">
                                                  <BookingIcon />
                                             </span>
                                        </div>
                                        <div className="input-container">
                                             <label htmlFor="time">Time</label>
                                             <input
                                                  type="time"
                                                  name="time"
                                                  id="time"
                                                  value={formData.time} // Controlled value
                                                  onChange={handleInputChange}
                                             />
                                             <span className="date-icon">
                                                  <TimeIcon />
                                             </span>
                                        </div>
                                        <div className="input-container">
                                             <label htmlFor="people">
                                                  People
                                             </label>
                                             <input
                                                  type="number"
                                                  name="num_people"
                                                  id="people"
                                                  className="people"
                                                  value={
                                                       formData.num_people === 0
                                                            ? ""
                                                            : formData.num_people
                                                  }
                                                  onChange={handleInputChange}
                                             />
                                        </div>
                                        <div className="status-container">
                                             <ul>
                                                  {[
                                                       "Pending",
                                                       "Confirmed",
                                                       "Cancelled",
                                                  ].map((status) => (
                                                       <li
                                                            key={status}
                                                            className={
                                                                 formData.status ===
                                                                 status
                                                                      ? "active"
                                                                      : ""
                                                            }
                                                            onClick={() =>
                                                                 handleStatusChange(
                                                                      status
                                                                 )
                                                            }
                                                       >
                                                            {status}
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </>
                              )
                         )}
                    </div>
                    <footer className="modal-footer">
                         <button onClick={onSave} disabled={loading}>
                              {loading ? "Saving..." : "Save"}
                         </button>
                    </footer>
               </div>
          </div>
     );
};

/** New Booking Modal */
export const NewBookingModal: React.FC<NewBookingModalProps> = ({
     closeModal,
}) => {
     const {
          formData,
          handleInputChange,
          handleStatusChange,
          createBookingHandler,
          resetForm,
          loading,
          error,
     } = useBookingCreate();

     const onSave = async () => {
          try {
               await createBookingHandler(formData);
               resetForm();
               closeModal();
          } catch (err) {
               console.error("Booking operation failed:", err);
               // Error is already handled in the hook, no need to show here
          }
     };

     return (
          <div className={`modal-overlay show`} onClick={closeModal}>
               <div
                    className="modal-container show"
                    onClick={(e) => e.stopPropagation()}
               >
                    <header className="modal-header">
                         <h4>New Booking</h4>
                         <button onClick={closeModal}>
                              <CloseIcon />
                         </button>
                    </header>
                    <div className="modal-body">
                         <div className="input-container">
                              <label htmlFor="date">Date</label>
                              <input
                                   type="date"
                                   name="date"
                                   id="date"
                                   className="date"
                                   value={formData.date || ""}
                                   onChange={handleInputChange}
                              />
                              <span className="date-icon">
                                   <BookingIcon />
                              </span>
                         </div>
                         <div className="input-container">
                              <label htmlFor="time">Time</label>
                              <input
                                   type="time"
                                   name="time"
                                   id="time"
                                   value={formData.time || ""}
                                   onChange={handleInputChange}
                              />
                              <span className="date-icon">
                                   <TimeIcon />
                              </span>
                         </div>
                         <div className="input-container">
                              <label htmlFor="people">People</label>
                              <input
                                   type="number"
                                   name="numPeople"
                                   id="people"
                                   className="people"
                                   min="1"
                                   value={
                                        formData.numPeople === 0
                                             ? ""
                                             : formData.numPeople
                                   }
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="input-container">
                              <label htmlFor="cust-name">Name</label>
                              <input
                                   type="text"
                                   name="customer.name"
                                   id="customer.name"
                                   className="name"
                                   value={formData.customer?.name || ""}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="input-container">
                              <label htmlFor="email">Email</label>
                              <input
                                   type="text"
                                   name="customer.email"
                                   id="customer.email"
                                   className="email"
                                   value={formData.customer?.email || ""}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="input-container">
                              <label htmlFor="Phone">Phone</label>
                              <input
                                   type="number"
                                   name="customer.phone"
                                   id="customer.phone"
                                   className="number"
                                   value={formData.customer?.phone || ""}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="status-container">
                              <ul>
                                   {["Pending", "Confirmed", "Cancelled"].map(
                                        (status) => (
                                             <li
                                                  key={status}
                                                  className={
                                                       formData.status ===
                                                       status
                                                            ? "active"
                                                            : ""
                                                  }
                                                  onClick={() =>
                                                       handleStatusChange(
                                                            status
                                                       )
                                                  }
                                             >
                                                  {status}
                                             </li>
                                        )
                                   )}
                              </ul>
                         </div>
                    </div>
                    <footer className="modal-footer">
                         {error && <div className="error-message">{error}</div>}
                         <button onClick={onSave} disabled={loading}>
                              {loading ? "Creating..." : "Create"}
                         </button>
                    </footer>
               </div>
          </div>
     );
};

export default {
     BookingModal,
     NewBookingModal,
};

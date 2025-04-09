import "./toaster.component.scss";
import { CloseIcon } from "../../lib/icons/Icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { hideToast } from "../../lib/redux/slices/toastSlice";
import { renderIcon } from "../../lib/utils/toaster.utils";

export const SuccessToaster = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, message, description, type } = useSelector(
    (state: RootState) => state.toast
  );

  const handleClose = () => {
    dispatch(hideToast());
  };

  // Auto-close after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className={[
        "toast-container",
        isOpen ? "open" : "close", // Open or close based on isOpen
        type, // Type directly applies the correct class (success, error, info, etc.)
      ]
        .filter(Boolean) // Remove any falsy values
        .join(" ")} // Join the class names into one string
    >
      <h5 className={[type].filter(Boolean).join("")}>{type.toUpperCase()}</h5>
      <CloseIcon onClose={handleClose} />
      <p>
        {renderIcon(type)}
        {message}
      </p>
      <span>{description}</span>
    </div>
  );
};

export default {
  SuccessToaster,
};

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons/Icons";

export const renderIcon = (type: string) => {
  switch (type) {
    case "success":
      return <SuccessIcon />;
    case "error":
      return <ErrorIcon />;
    case "info":
      return <InfoIcon />;
    case "warning":
      return <WarningIcon />;
    default:
      return null;
  }
};

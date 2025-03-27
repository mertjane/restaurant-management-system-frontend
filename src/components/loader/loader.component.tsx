import "./loader.component.scss";

export const ButtonLoader = () => {
  return <div className="dot-flashing"></div>
};

export const Spinner = () => {
  return <span className="loader"></span>
}

export default {
  ButtonLoader,
  Spinner
}

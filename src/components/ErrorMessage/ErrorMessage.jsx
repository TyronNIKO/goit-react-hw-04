import toast from "react-hot-toast";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({children}) => {
    return <div className={css.errormessage}>{children}</div>;
};

export default ErrorMessage;

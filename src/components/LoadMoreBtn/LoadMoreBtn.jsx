import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({children, onClick, disabled}) => {
    return (
        <div className={styles.loadmorebtn}>
            <button onClick={onClick} type="button" disabled={disabled}>
                {children}
            </button>
        </div>
    );
};

export default LoadMoreBtn;

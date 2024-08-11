import css from "./SearchBox.module.css";
const SearchBox = ({value, onFilter}) => {
    return (
        <div className={css["search-box"]}>
            <p className={css.text}>Find contacts by name or number</p>
            <input type="text" value={value} onChange={e => onFilter(e.target.value)} />
        </div>
    );
};
export default SearchBox;

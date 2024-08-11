import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
const ContactList = ({data, onDelete}) => {
    return (
        <ul className={css.list}>
            {data.map(item => (
                <li key={item.id}>
                    <Contact id={item.id} name={item.name} phone={item.number} onDelete={onDelete} />
                </li>
            ))}
        </ul>
    );
};
export default ContactList;

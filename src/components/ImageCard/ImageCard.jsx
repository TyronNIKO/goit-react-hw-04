import css from "./ImageCard.module.css";
import {FaHeart} from "react-icons/fa";

const ImageCard = ({img, openModal}) => {
    return (
        <div className={css.imagecard} onClick={() => openModal(img.urls.regular, img.alt_description)}>
            <img src={img.urls.small} alt={img.alt_description} />
            <div className={css.info}>
                <div className={css.author}>{img.user.name}</div>
                <div className={css.likes}>
                    <FaHeart /> {img.likes}
                </div>
            </div>
        </div>
    );
};

export default ImageCard;

// src/App.jsx
import "./App.css";

import {useEffect, useRef, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import {fetchPhoto} from "../unsplash-api.js";
import toast, {Toaster} from "react-hot-toast";

const App = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalUrl, setModalUrl] = useState("");
    const [modalAlt, setModalAlt] = useState("");
    const scrollBlock = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const request = e.target.elements.request.value;
        // console.log(request);
        if (request.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }
        setSearch(request);

        e.target.reset();
        setPhotos([]);
        setError(false);
        setLoading(true);
        setPage(1);
        setIsVisible(false);
        setIsEmpty(false);
    };

    const onLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const openModal = (url, alt) => {
        setShowModal(true);
        setModalUrl(url);
        setModalAlt(alt);
    };
    const closeModal = () => {
        setShowModal(false);
        setModalUrl("");
        setModalAlt("");
    };
    useEffect(() => {
        if (!search) return;
        const fetchImages = async () => {
            setLoading(true);
            try {
                const data = await fetchPhoto(search, page, 15);
                // console.log(data);
                // console.log(data.results);
                if (!data.results.length) {
                    toast.error("Sorry. There is no images...");
                    return setIsEmpty(true);
                }
                setPhotos(prevImages => [...prevImages, ...data.results]);
                setIsVisible(page < Math.ceil(data.total_pages / data.results.length));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [search, page]);
    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    }, [photos]);
    return (
        <div ref={scrollBlock}>
            <SearchBar onSubmit={handleSubmit} />
            <ImageGallery images={photos} openModal={openModal} />
            {loading && <Loader />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {isEmpty && <ErrorMessage>Sorry. There is no images...</ErrorMessage>}
            {isVisible && (
                <LoadMoreBtn onClick={onLoadMore} disabled={loading}>
                    Load more
                </LoadMoreBtn>
            )}
            <ImageModal modalIsOpen={showModal} src={modalUrl} alt={modalAlt} closeModal={closeModal} />
            <Toaster position="top-right" />
        </div>
    );
};

export default App;

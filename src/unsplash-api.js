import axios from "axios";
import opts from "../opts.js";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchPhoto = async (query, page, per_page) => {
    // console.log(query, page, per_page);
    const url = `/search/photos/?client_id=${opts.ACC_KEY}&query=${query}&page=${page}&per_page=${per_page}`;
    // console.log(url);

    const response = await axios.get(url);
    return response.data;
};

import axios from "axios";
import Notiflix from 'notiflix';

async function searchImages(searchQuery, currentPage) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '37016805-d1d678301f08548020cdd855a';


    const params = {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
    };


    try {
        const response = await axios.get(`${BASE_URL}`, {params})
        const data = response.data;
        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }
}

export default searchImages;
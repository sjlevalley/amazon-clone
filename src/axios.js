import axios from "axios";

const instance = axios.create({
    // THE API (cloud function) URL
    baseURL: 'https://us-central1-clone-c04a7.cloudfunctions.net/api'
    // baseURL: 'http://localhost:5001/clone-c04a7/us-central1/api'
});

export default instance;
import axios from "axios";

axios.interceptors.response.use(response => {
    if (response.data.message && !response.data.success) {
        console.error(response.data.message);
    }
    if (!response.data.success && response.data.data && response.data.data.code === 401) {
        window.location.href = "/user/login";
    }
    return response.data;
});

export default axios;

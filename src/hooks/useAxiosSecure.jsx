
import axios from "axios";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://eduassists-app-server.vercel.app',
});

const useAxiosSecure = () => {

    return axiosSecure;
    
};

export default useAxiosSecure;
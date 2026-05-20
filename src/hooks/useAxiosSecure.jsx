
import axios from "axios";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:3000',
    // baseURL: 'https://eduassists-app-server.vercel.app',
    baseURL: import.meta.env.VITE_SERVER_URL ||  'http://localhost:3000', 
});

const useAxiosSecure = () => {

    return axiosSecure;
    
};

export default useAxiosSecure;
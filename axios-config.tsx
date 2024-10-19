import axios from "axios";
const initialize =  () => {
    const axiosConfig = axios.create({
        baseURL: "http://localhost:4000/api",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Accept",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZmYzY2OGJiNzUwMmIzMWNlMDljNTgiLCJpYXQiOjE3MjkxNTQ4NDh9.xE995gxQeHtWMsusl3GQm57baNVllhElTY6ri4a2i9k`
        }
    });


    return axiosConfig;
}

const axiosConfig =  initialize()
export default axiosConfig;

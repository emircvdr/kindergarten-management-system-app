import axios from 'axios';
// const baseURL = 'https://kindergarten-management-system-service.onrender.com';
const baseURL = 'http://localhost:5000/';
export class ConfigApi {
    public static LibraryApi() {
        return axios.create({
            baseURL: baseURL,
        });
    }
}
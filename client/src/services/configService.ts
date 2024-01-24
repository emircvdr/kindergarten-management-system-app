import axios from "axios";
// const baseURL = "https://kindergarten-management-system-service.onrender.com";
const baseURL = "http://localhost:5001/";
export class ConfigApi {
  public static LibraryApi() {
    return axios.create({
      baseURL: baseURL,
    });
  }
}

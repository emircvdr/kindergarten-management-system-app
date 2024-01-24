import axios from "axios";
// const baseURL = "https://kindergarten-management-system-service.onrender.com"; {yusuf bey onrender}
const baseURL = "https://kindergarten-management-system-services.onrender.com"; // {emir  onrender}
// const baseURL = "http://localhost:5001/";
export class ConfigApi {
  public static LibraryApi() {
    return axios.create({
      baseURL: baseURL,
    });
  }
}

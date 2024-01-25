import axios from "axios";
// const baseURL = "https://kindergarten-management-system-service.onrender.com"; {yusuf bey onrender}
// const baseURL = "https://kindergarten-management-system-services.onrender.com"; // {emir  onrender}
const baseURL = "http://localhost:5001/";
const accountBaseURL = "http://localhost:5005/";
// const accountBaseURL = "https://pedasoft-dev-account-system-mern.onrender.com"
export class ConfigApi {
  public static LibraryApi() {
    return axios.create({
      baseURL: baseURL,
    });
  }
  public static AccountSystemApi() {
    return axios.create({
      baseURL: accountBaseURL,
    });
  }
}

import { IStudents } from "../interfaces/IStudents";
import { ConfigApi } from "./configService";

export class KindergartenAPI {
    // PARTS API
    public static async CreateStudent(student: IStudents.ICreateStudent): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().post('student', student).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async GetStudents(): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().get('student').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

}
import { IStudents } from "../interfaces/IStudents";
import { IPreliminaryInterview } from "../interfaces/IPreliminaryInterview";
import { ConfigApi } from "./configService";

export class KindergartenAPI {
  // PARTS API
  public static async CreateStudent(
    student: IStudents.ICreateStudent
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("student", student)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetStudents(): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("student")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetStudentById(studentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`student/${studentId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async UpdateStudent(
    studentId: string,
    student: IStudents.ICreateStudent
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`student/${studentId}`, student)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // INTERVIEW API
  public static async CreateInterview(
    interview: IPreliminaryInterview.ICreateInterview
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("preliminaryInterview", interview)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetInterviews(): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("preliminaryInterview")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

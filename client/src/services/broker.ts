import { IStudents } from "../interfaces/IStudents";
import { IPreliminaryInterview } from "../interfaces/IPreliminaryInterview";
import { ConfigApi } from "./configService";
import { ITeacher } from "../interfaces/ITeacher";
import { IClass } from "../interfaces/IClass";
import { IEmployee } from "../interfaces/IEmployee";

export class KindergartenAPI {
  // auth API --start
  public static async Login(login: any): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.AccountSystemApi()
        .post("auth/login", login)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async Register(register: any): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.AccountSystemApi()
        .post("auth/register", register)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async RefreshToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.AccountSystemApi()
        .post("auth/refresh-token", { refreshToken: token })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //--end

  public static async CreateStudent(
    student: IStudents.ICreateStudentObj
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
    student: IStudents.IStudentDetails
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

  public static async DeleteStudent(studentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`student/${studentId}`)
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

  public static async GetInterviewById(interviewId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`preliminaryInterview/${interviewId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async UpdateInterview(
    interviewId: string,
    interview: IPreliminaryInterview.IInterview
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`preliminaryInterview/${interviewId}`, interview)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async DeleteInterview(interviewId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`preliminaryInterview/${interviewId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // TEACHER API

  public static async CreateTeacher(
    teacher: ITeacher.ICreateTeacher
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("teacher", teacher)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetTeachers(): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("teacher")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetTeacherById(teacherId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`teacher/${teacherId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async UpdateTeacher(
    teacherId: string,
    teacher: ITeacher.ITeacherDetails
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`teacher/${teacherId}`, teacher)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async DeleteTeacher(teacherId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`teacher/${teacherId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // CLASS API

  public static async CreateClass(classes: IClass.ICreateClass): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("classes", classes)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("classes")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetClassById(classId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`classes/${classId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async UpdateClass(
    classId: string,
    classes: IClass.IClassDetails
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`classes/${classId}`, classes)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async DeleteClass(classId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`classes/${classId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // EMPLOYEE API

  public static async CreateEmployee(
    employee: IEmployee.ICreateEmployee
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("employee", employee)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetEmployees(): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("employee")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async GetEmployeeById(employeeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`employee/${employeeId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async UpdateEmployee(
    employeeId: string,
    employee: IEmployee.IEmployeeDetails
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`employee/${employeeId}`, employee)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async DeleteEmployee(employeeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`employee/${employeeId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

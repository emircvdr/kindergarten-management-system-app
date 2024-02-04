export namespace IEmployee {
  export interface IEmployee {
    _id: string;
    fullName: string;
    gender: string;
    dutyGroup: string;
    birthDate: string;
    phoneNumber: string;
    isActive: boolean;
    isDeleted: boolean;
  }
  export interface ICreateEmployee {
    fullName: string;
    gender: string;
    dutyGroup: string;
    birthDate: string;
    phoneNumber: string;
  }
  export interface IEmployeeDetails {
    _id: string;
    fullName: string;
    gender: string;
    dutyGroup: string;
    birthDate: string;
    phoneNumber: string;
    isActive: boolean;
    isDeleted: boolean;
  }
}

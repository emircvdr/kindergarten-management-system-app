export namespace ITeacher {
  export interface ITeacher {
    _id: string;
    fullName: string;
    gender: string;
    dutyGroup: string;
    birthDate: string;
    phoneNumber: string;
    isActive: boolean;
    isDeleted: boolean;
  }
  export interface ICreateTeacher {
    fullName: string;
    gender: string;
    dutyGroup: string;
    birthDate: string;
    phoneNumber: string;
  }
  export interface ITeacherDetails {
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

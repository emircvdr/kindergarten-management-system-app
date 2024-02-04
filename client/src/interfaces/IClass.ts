export namespace IClass {
  export interface IClass {
    _id: string;
    className: string;
    ageGroup: string;
    classCapacity: string;
    relatedTeacher: string;
    isActive: boolean;
    isDeleted: boolean;
  }
  export interface ICreateClass {
    className: string;
    ageGroup: string;
    classCapacity: string;
    relatedTeacher: string;
  }
  export interface IClassDetails {
    _id: string;
    className: string;
    ageGroup: string;
    classCapacity: string;
    relatedTeacher: string;
    isActive: boolean;
    isDeleted: boolean;
  }
}

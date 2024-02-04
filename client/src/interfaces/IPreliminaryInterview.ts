export namespace IPreliminaryInterview {
  export interface IStudent {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
    preinterviewDate: string;
    isDeleted: boolean;
    isActive: boolean;
  }
  export interface ICreateStudent {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
    preinterviewDate: string;
  }
  export interface IParent {
    _id: string;
    studentId: string;
    motherFullName: string;
    motherPhoneNumber: string;
    motherJob: string;
    fatherFullName: string;
    fatherPhoneNumber: string;
    fatherJob: string;
    isDeleted: boolean;
    isActive: boolean;
  }
  export interface ICreateParent {
    motherFullName: string;
    motherPhone: string;
    motherJob: string;
    fatherFullName: string;
    fatherPhone: string;
    fatherJob: string;
  }
  export interface IOther {
    _id: string;
    studentId: string;
    paymentMethod: string;
    paymentAmount: string;
    installmentPayment: string;
    unitinstallmentPayment: string;
    contractAmount: string;
    interviewNotes: string;
    isDeleted: boolean;
    isActive: boolean;
  }
  export interface ICreateOther {
    paymentMethod: string;
    paymentAmount: string;
    installmentPayment: string;
    unitinstallmentPayment: string;
    contractAmount: string;
    interviewNotes: string;
  }
  export interface ICreateInterview {
    student: ICreateStudent;
    parent: ICreateParent;
    other: ICreateOther;
  }
  export interface IInterview {
    student: IStudent;
    parent: IParent;
    other: IOther;
  }
}

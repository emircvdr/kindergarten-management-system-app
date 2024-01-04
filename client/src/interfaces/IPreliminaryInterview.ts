export namespace IPreliminaryInterview {
  export interface IStudent {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
    preinterviewDate: string;
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
    installmentPayment: string;
    unitinstallmentPayment: string;
    contractAmount: string;
    interviewNotes: string;
  }
  export interface ICreateOther {
    paymentMethod: string;
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
}

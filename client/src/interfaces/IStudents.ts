export namespace IStudents {
  export interface IStudent {
    _id: string;
    photo: string;
    identificationNumber: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    class: string;
    nationality: string;
    gender: string;
    isDeleted: boolean;
    isActive: boolean;
  }
  export interface ICreateStudent {
    photo: string;
    identificationNumber: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    class: string;
    nationality: string;
    gender: string;
  }

  export interface IParent {
    _id: string;
    studentId: string;
    fullName: string;
    identificationNumber: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    email: string;
    isParent: boolean;
    isDeleted: boolean;
    isActive: boolean;
  }
  export interface ICreateParent {
    fullName: string;
    identificationNumber: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    email: string;
    isParent: boolean;
  }

  export interface IOther {
    _id: string;
    studentId: string;
    isParentsTogether: string;
    bloodGroup: string;
    isAllergy: boolean;
    allergyType: string;
    isChronicDisease: boolean;
    chronicDiseaseType: string;
    emergencyContactFullName: string;
    emergencyContactPhoneNumber: string;
    emergencyContactDegreeOfProximity: string;
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
    isParentsTogether: string;
    bloodGroup: string;
    isAllergy: boolean;
    allergyType: string;
    isChronicDisease: boolean;
    chronicDiseaseType: string;
    emergencyContactFullName: string;
    emergencyContactPhoneNumber: string;
    emergencyContactDegreeOfProximity: string;
    paymentMethod: string;
    paymentAmount: string;
    installmentPayment: string;
    unitinstallmentPayment: string;
    contractAmount: string;
    interviewNotes: string;
  }
  export interface ICreateStudentObj {
    student: ICreateStudent;
    parent: {
      mother: ICreateParent;
      father: ICreateParent;
      heir: ICreateParent;
    };
    other: ICreateOther;
  }

  export interface IStudentDetails {
    student: IStudent;
    parent: {
      mother: IParent;
      father: IParent;
      heir: IParent;
    };
    other: IOther;
  }
}

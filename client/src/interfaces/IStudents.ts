export namespace IStudents {
    export interface IStudent {
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
        isParentsTogether: string;
        bloodGroup: string;
        isAllergy: boolean;
        allergyType: string;
        isChronicDisease: boolean;
        chronicDiseaseType: string;
        emergencyContactFullName: string;
        emergencyContactPhoneNumber: string;
        emergencyContactDegreeOfProximity: string;
    }


    export interface ICreateStudent {
        student: IStudent;
        parent: {
            mother: IParent;
            father: IParent;
            heir: IParent;
        };
        other: IOther
    }
}
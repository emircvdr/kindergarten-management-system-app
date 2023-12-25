export namespace IStudents {
    export interface IStudent {
        photo: File | null;
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
        allergy: {
            isAllergy: boolean;
            allergyType: string;
        };
        chronicDisease: {
            isChronicDisease: boolean;
            chronicDiseaseType: string;
        };
        emergencyContact: {
            fullName: string;
            phoneNumber: string;
            degreeOfProximity: string;
        }
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
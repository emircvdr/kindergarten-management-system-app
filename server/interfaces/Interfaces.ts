namespace Interfaces {
    // IStudent Interfaces

    // model -- start
    export interface IStudent {
        identificationNumber: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        birthPlace: string;
        class: string;
        nationality: string;
        gender: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface IParent {
        studentId: string;
        fullName: string;
        identificationNumber: string;
        phoneNumber: string;
        job: string;
        address: string;
        workAddress: string;
        email: string;
        isParent: boolean;
        createdAt: string;
        updatedAt: string;
    }

    export interface IStudentOther {
        studentId: string;
        bloodGroup: string;
        isParentsTogether: boolean;
        isAllergy: boolean;
        allergyType: string;
        isChronicDisease: boolean;
        chronicDiseaseType: string;
        emergencyContactFullName: string;
        emergencyContactPhoneNumber: string;
        emergencyContactDegreeOfProximity: string;
    }

    export interface IStudentPhoto {
        studentId: string;
        photo: string;
    }
    // model -- end

    // ICreateStudent Interfaces
    interface ICreateParent {
        fullName: string;
        identificationNumber: string;
        phoneNumber: string;
        job: string;
        address: string;
        workAddress: string;
        email: string;
        isParent: boolean;
    }

    export interface ICreateStudent {
        student: {
            photo: File | null;
            identificationNumber: string;
            firstName: string;
            lastName: string;
            birthDate: string;
            birthPlace: string;
            class: string;
            nationality: string;
            gender: string;
            createdAt: string;
            updatedAt: string;
        },
        parent: {
            mother: ICreateParent;
            father: ICreateParent;
            heir: ICreateParent;
        },
        other: {
            bloodGroup: string;
            isParentsTogether: boolean;
            isAllergy: boolean;
            allergyType: string;
            isChronicDisease: boolean;
            chronicDiseaseType: string;
            emergencyContactFullName: string;
            emergencyContactPhoneNumber: string;
            emergencyContactDegreeOfProximity: string;
        }

    }
}

export default Interfaces;
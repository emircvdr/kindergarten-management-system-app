import Student from "../models/studentModels/student.js";
import StudentMother from "../models/studentModels/studentMother.js";
import StudentFather from "../models/studentModels/studentFather.js";
import StudentHeir from "../models/studentModels/studentHeir.js";
import StudentOther from "../models/studentModels/studentOther.js";
import StudentPhoto from "../models/studentModels/studentPhoto.js";

// Path: server/controllers/student.js

export const createStudent = async (req, res) => {
    const createStudent = req.body;
    const student = createStudent.student;
    const mother = createStudent.parent.mother;
    const father = createStudent.parent.father;
    const heir = createStudent.parent.heir;
    const other = createStudent.other;

    try {
        // create student
        const newStudent = new Student({
            firstName: student.firstName,
            lastName: student.lastName,
            identificationNumber: student.identificationNumber,
            birthDate: student.birthDate,
            birthPlace: student.birthPlace,
            class: student.class,
            gender: student.gender,
            nationality: student.nationality,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })

        // create student photo
        const newStudentPhoto = new StudentPhoto({
            studentId: newStudent._id,
            photo: student.photo,
        })


        // create student mother
        const newStudentMother = new StudentMother({
            studentId: newStudent._id,
            fullName: mother.fullName,
            identificationNumber: mother.identificationNumber,
            phoneNumber: mother.phoneNumber,
            job: mother.job,
            address: mother.address,
            workAddress: mother.workAddress,
            email: mother.email,
            isParent: mother.isParent,
        })

        // create student father
        const newStudentFather = new StudentFather({
            studentId: newStudent._id,
            fullName: father.fullName,
            identificationNumber: father.identificationNumber,
            phoneNumber: father.phoneNumber,
            job: father.job,
            address: father.address,
            workAddress: father.workAddress,
            email: father.email,
            isParent: father.isParent,
        })

        // create student heir
        const newStudentHeir = new StudentHeir({
            studentId: newStudent._id,
            fullName: heir.fullName,
            identificationNumber: heir.identificationNumber,
            phoneNumber: heir.phoneNumber,
            job: heir.job,
            address: heir.address,
            workAddress: heir.workAddress,
            email: heir.email,
            isParent: heir.isParent,
        })

        // create student other
        const newStudentOther = new StudentOther({
            studentId: newStudent._id,
            bloodGroup: other.bloodGroup,
            isParentsTogether: other.isParentsTogether,
            isAllergy: other.isAllergy,
            allergyType: other.allergyType,
            isChronicDisease: other.isChronicDisease,
            chronicDiseaseType: other.chronicDiseaseType,
            emergencyContactFullName: other.emergencyContactFullName,
            emergencyContactPhoneNumber: other.emergencyContactPhoneNumber,
            emergencyContactDegreeOfProximity: other.emergencyContactDegreeOfProximity,
        })

        await newStudent.save();
        await newStudentMother.save();
        await newStudentFather.save();
        await newStudentHeir.save();
        await newStudentOther.save();
        await newStudentPhoto.save();

        res.status(201).json({
            message: "Student created successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        })
    }

};

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        })
    }
}
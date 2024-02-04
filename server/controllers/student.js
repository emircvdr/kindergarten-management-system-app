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
    });

    // create student photo
    if (student.photo === null || student.photo === undefined) {
      student.photo = "";
    }
    const newStudentPhoto = new StudentPhoto({
      studentId: newStudent._id,
      photo: student.photo,
    });

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
    });

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
    });

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
    });

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
      emergencyContactDegreeOfProximity:
        other.emergencyContactDegreeOfProximity,
      paymentMethod: other.paymentMethod,
      paymentAmount: other.paymentAmount,
      installmentPayment: other.installmentPayment,
      unitinstallmentPayment: other.unitinstallmentPayment,
      contractAmount: other.contractAmount,
      interviewNotes: other.interviewNotes,
    });

    await newStudent.save();
    await newStudentMother.save();
    await newStudentFather.save();
    await newStudentHeir.save();
    await newStudentOther.save();
    await newStudentPhoto.save();

    res.status(201).json({
      message: "Student created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      isDeleted: false,
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    const mother = await StudentMother.find({ studentId: id });
    const father = await StudentFather.find({ studentId: id });
    const heir = await StudentHeir.find({ studentId: id });
    const other = await StudentOther.find({ studentId: id });
    const photo = await StudentPhoto.find({ studentId: id });

    const emptyParent = {
      studentId: id,
      fullName: "",
      identificationNumber: "",
      phoneNumber: "",
      job: "",
      address: "",
      workAddress: "",
      email: "",
      isParent: false,
      createdAt: "",
      updatedAt: "",
    };

    if (!student) {
      return res.status(400).json({
        message: "öğrenci bulunamadı!",
        error,
      });
    }
    if (!mother[0]) {
      mother[0] = emptyParent;
    }
    if (!father[0]) {
      father[0] = emptyParent;
    }
    if (!heir[0]) {
      heir[0] = emptyParent;
    }
    if (!other[0]) {
      other[0] = {
        studentId: id,
        bloodGroup: "",
        isParentsTogether: "",
        isAllergy: false,
        allergyType: "",
        isChronicDisease: false,
        chronicDiseaseType: "",
        emergencyContactFullName: "",
        emergencyContactPhoneNumber: "",
        emergencyContactDegreeOfProximity: "",
        paymentMethod: "",
        paymentAmount: "",
        installmentPayment: "",
        unitinstallmentPayment: "",
        contractAmount: "",
        interviewNotes: "",
      };
    }
    if (!photo[0]) {
      photo[0] = {
        studentId: id,
        photo: "",
      };
    }
    const studentCopy = {
      identificationNumber: student.identificationNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      birthPlace: student.birthPlace,
      class: student.class,
      gender: student.gender,
      nationality: student.nationality,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      photo: photo[0].photo,
      isActive: student.isActive,
    };
    const data = {
      student: studentCopy,
      parent: {
        mother: mother[0],
        father: father[0],
        heir: heir[0],
      },
      other: other[0],
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateStudent = async (req, res) => {
  const id = req.params.id;
  const updateStudent = req.body;
  const student = updateStudent.student;
  const mother = updateStudent.parent.mother;
  const father = updateStudent.parent.father;
  const heir = updateStudent.parent.heir;
  const other = updateStudent.other;

  try {
    const studentToUpdate = await Student.findById(id);

    if (!studentToUpdate) {
      return res.status(400).json({
        message: "öğrenci bulunamadı!",
        error,
      });
    }

    // update student
    studentToUpdate.firstName = student.firstName;
    studentToUpdate.lastName = student.lastName;
    studentToUpdate.identificationNumber = student.identificationNumber;
    studentToUpdate.birthDate = student.birthDate;
    studentToUpdate.birthPlace = student.birthPlace;
    studentToUpdate.class = student.class;
    studentToUpdate.gender = student.gender;
    studentToUpdate.nationality = student.nationality;
    studentToUpdate.isActive = student.isActive;

    // update student photo
    const studentPhotoToUpdate = await StudentPhoto.find({ studentId: id });
    if (student.photo === null || student.photo === undefined) {
      student.photo = "";
    }
    studentPhotoToUpdate[0].photo = student.photo;

    // update student mother
    const motherToUpdate = await StudentMother.find({ studentId: id });
    motherToUpdate[0].fullName = mother.fullName;
    motherToUpdate[0].identificationNumber = mother.identificationNumber;
    motherToUpdate[0].phoneNumber = mother.phoneNumber;
    motherToUpdate[0].job = mother.job;
    motherToUpdate[0].address = mother.address;
    motherToUpdate[0].workAddress = mother.workAddress;
    motherToUpdate[0].email = mother.email;
    motherToUpdate[0].isParent = mother.isParent;
    motherToUpdate[0].isActive = student.isActive;

    // update student father
    const fatherToUpdate = await StudentFather.find({ studentId: id });
    fatherToUpdate[0].fullName = father.fullName;
    fatherToUpdate[0].identificationNumber = father.identificationNumber;
    fatherToUpdate[0].phoneNumber = father.phoneNumber;
    fatherToUpdate[0].job = father.job;
    fatherToUpdate[0].address = father.address;
    fatherToUpdate[0].workAddress = father.workAddress;
    fatherToUpdate[0].email = father.email;
    fatherToUpdate[0].isParent = father.isParent;
    fatherToUpdate[0].isActive = student.isActive;

    // update student heir
    const heirToUpdate = await StudentHeir.find({ studentId: id });
    heirToUpdate[0].fullName = heir.fullName;
    heirToUpdate[0].identificationNumber = heir.identificationNumber;
    heirToUpdate[0].phoneNumber = heir.phoneNumber;
    heirToUpdate[0].job = heir.job;
    heirToUpdate[0].address = heir.address;
    heirToUpdate[0].workAddress = heir.workAddress;
    heirToUpdate[0].email = heir.email;
    heirToUpdate[0].isParent = heir.isParent;
    heirToUpdate[0].isActive = student.isActive;

    // update student other
    const updateToOther = await StudentOther.find({ studentId: id });
    updateToOther[0].bloodGroup = other.bloodGroup;
    updateToOther[0].isParentsTogether = other.isParentsTogether;
    updateToOther[0].isAllergy = other.isAllergy;
    updateToOther[0].allergyType = other.allergyType;
    updateToOther[0].isChronicDisease = other.isChronicDisease;
    updateToOther[0].chronicDiseaseType = other.chronicDiseaseType;
    updateToOther[0].emergencyContactFullName = other.emergencyContactFullName;
    updateToOther[0].emergencyContactPhoneNumber =
      other.emergencyContactPhoneNumber;
    updateToOther[0].emergencyContactDegreeOfProximity =
      other.emergencyContactDegreeOfProximity;
    updateToOther[0].paymentMethod = other.paymentMethod;
    updateToOther[0].paymentAmount = other.paymentAmount;
    updateToOther[0].installmentPayment = other.installmentPayment;
    updateToOther[0].unitinstallmentPayment = other.unitinstallmentPayment;
    updateToOther[0].contractAmount = other.contractAmount;
    updateToOther[0].interviewNotes = other.interviewNotes;
    updateToOther[0].isActive = student.isActive;

    await studentToUpdate.save();
    await studentPhotoToUpdate[0].save();
    await motherToUpdate[0].save();
    await fatherToUpdate[0].save();
    await heirToUpdate[0].save();
    await updateToOther[0].save();

    res.status(200).json({
      message: "Student updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findById(id);
    const studentMother = await StudentMother.find({
      studentId: id,
    });
    const studentFather = await StudentFather.find({
      studentId: id,
    });
    const studentHeir = await StudentHeir.find({
      studentId: id,
    });
    const studentOther = await StudentOther.find({
      studentId: id,
    });
    const studentPhoto = await StudentPhoto.find({
      studentId: id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (!studentMother) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (!studentFather) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (!studentHeir) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (!studentOther) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (!studentPhoto) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    await Student.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await StudentMother.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await StudentFather.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await StudentHeir.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await StudentOther.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await StudentPhoto.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    res.status(200).json({
      message: "Silme İşlemi Başarılı",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

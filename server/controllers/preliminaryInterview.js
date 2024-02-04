import PreliminaryInterviewStudent from "../models/preinterviewModels/preliminaryInterviewStudent.js";
import PreliminaryInterviewParent from "../models/preinterviewModels/preliminaryInterviewParent.js";
import PreliminaryInterviewOther from "../models/preinterviewModels/preliminaryInterviewOther.js";

export const createPreliminaryInterview = async (req, res) => {
  const createPreliminaryInterview = req.body;
  const student = createPreliminaryInterview.student;
  const parent = createPreliminaryInterview.parent;
  const other = createPreliminaryInterview.other;

  try {
    const newInterviewStudent = new PreliminaryInterviewStudent({
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      gender: student.gender,
      ageGroup: student.ageGroup,
      preinterviewDate: student.preinterviewDate,
    });
    const newInterviewParent = new PreliminaryInterviewParent({
      studentId: newInterviewStudent._id,
      motherFullName: parent.motherFullName,
      motherPhoneNumber: parent.motherPhoneNumber,
      motherJob: parent.motherJob,
      fatherFullName: parent.fatherFullName,
      fatherPhoneNumber: parent.fatherPhoneNumber,
      fatherJob: parent.fatherJob,
    });
    const newInterviewOther = new PreliminaryInterviewOther({
      studentId: newInterviewStudent._id,
      paymentAmount: other.paymentAmount,
      paymentMethod: other.paymentMethod,
      installmentPayment: other.installmentPayment,
      unitinstallmentPayment: other.unitinstallmentPayment,
      contractAmount: other.contractAmount,
      interviewNotes: other.interviewNotes,
    });
    await newInterviewStudent.save();
    await newInterviewParent.save();
    await newInterviewOther.save();

    res
      .status(201)
      .json({ newInterviewStudent, newInterviewParent, newInterviewOther });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPreliminaryInterviews = async (req, res) => {
  try {
    const preliminaryInterview = await PreliminaryInterviewStudent.find({
      isDeleted: false,
    });
    res.status(200).json(preliminaryInterview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPreliminaryInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const preliminaryInterview = await PreliminaryInterviewStudent.findById(id);
    const preliminaryInterviewParent = await PreliminaryInterviewParent.find({
      preliminaryInterviewStudentId: id,
    });
    const preliminaryInterviewOther = await PreliminaryInterviewOther.find({
      preliminaryInterviewStudentId: id,
    });

    if (!preliminaryInterview)
      return res.status(404).json({ message: "Not Found" });

    if (!preliminaryInterviewParent)
      return res.status(404).json({ message: "Not Found" });

    if (!preliminaryInterviewOther)
      return res.status(404).json({ message: "Not Found" });

    const preliminaryInterviewCopy = {
      firstName: preliminaryInterview.firstName,
      lastName: preliminaryInterview.lastName,
      birthDate: preliminaryInterview.birthDate,
      gender: preliminaryInterview.gender,
      ageGroup: preliminaryInterview.ageGroup,
      preinterviewDate: preliminaryInterview.preinterviewDate,
      isActive: preliminaryInterview.isActive,
    };

    const preliminaryInterviewParentCopy = {
      motherFullName: preliminaryInterviewParent.motherFullName,
      motherPhoneNumber: preliminaryInterviewParent.motherPhoneNumber,
      motherJob: preliminaryInterviewParent.motherJob,
      fatherFullName: preliminaryInterviewParent.fatherFullName,
      fatherPhoneNumber: preliminaryInterviewParent.fatherPhoneNumber,
      fatherJob: preliminaryInterviewParent.fatherJob,
    };

    const preliminaryInterviewOtherCopy = {
      paymentAmount: preliminaryInterviewOther.paymentAmount,
      paymentMethod: preliminaryInterviewOther.paymentMethod,
      installmentPayment: preliminaryInterviewOther.installmentPayment,
      unitinstallmentPayment: preliminaryInterviewOther.unitinstallmentPayment,
      contractAmount: preliminaryInterviewOther.contractAmount,
      interviewNotes: preliminaryInterviewOther.interviewNotes,
    };
    const data = {
      preliminaryInterview: preliminaryInterviewCopy,
      preliminaryInterviewParent: preliminaryInterviewParentCopy,
      preliminaryInterviewOther: preliminaryInterviewOtherCopy,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePreliminaryInterview = async (req, res) => {
  const id = req.params.id;
  const updatePreliminaryInterview = req.body;
  const student = updatePreliminaryInterview.student;
  const parent = updatePreliminaryInterview.parent;
  const other = updatePreliminaryInterview.other;

  try {
    const updatedPreliminaryInterviewStudent =
      await PreliminaryInterviewStudent.findByIdAndUpdate(id, {
        firstName: student.firstName,
        lastName: student.lastName,
        birthDate: student.birthDate,
        gender: student.gender,
        ageGroup: student.ageGroup,
        preinterviewDate: student.preinterviewDate,
        isActive: student.isActive,
      });
    const updatedPreliminaryInterviewParent =
      await PreliminaryInterviewParent.findByIdAndUpdate(id, {
        studentId: updatedPreliminaryInterviewStudent._id,
        motherFullName: parent.motherFullName,
        motherPhoneNumber: parent.motherPhoneNumber,
        motherJob: parent.motherJob,
        fatherFullName: parent.fatherFullName,
        fatherPhoneNumber: parent.fatherPhoneNumber,
        fatherJob: parent.fatherJob,
        isActive: student.isActive,
      });
    const updatedPreliminaryInterviewOther =
      await PreliminaryInterviewOther.findByIdAndUpdate(id, {
        studentId: updatedPreliminaryInterviewStudent._id,
        paymentAmount: other.paymentAmount,
        paymentMethod: other.paymentMethod,
        installmentPayment: other.installmentPayment,
        unitinstallmentPayment: other.unitinstallmentPayment,
        contractAmount: other.contractAmount,
        interviewNotes: other.interviewNotes,
        isActive: student.isActive,
      });
    res.status(200).json({
      updatedPreliminaryInterviewStudent,
      updatedPreliminaryInterviewParent,
      updatedPreliminaryInterviewOther,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePreliminaryInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const preliminaryInterview = await PreliminaryInterviewStudent.findById(id);
    const preliminaryInterviewParent = await PreliminaryInterviewParent.find({
      preliminaryInterviewStudentId: id,
    });
    const preliminaryInterviewOther = await PreliminaryInterviewOther.find({
      preliminaryInterviewStudentId: id,
    });

    if (!preliminaryInterview)
      return res.status(404).json({ message: "Not Found" });

    if (!preliminaryInterviewParent)
      return res.status(404).json({ message: "Not Found" });

    if (!preliminaryInterviewOther)
      return res.status(404).json({ message: "Not Found" });

    await PreliminaryInterviewStudent.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await PreliminaryInterviewParent.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    await PreliminaryInterviewOther.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    res.status(200).json({ message: "Silme İşlemi Başarılı" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
    const preliminaryInterview = await PreliminaryInterviewStudent.find();
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
    res.status(200).json({ preliminaryInterview, preliminaryInterviewParent });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

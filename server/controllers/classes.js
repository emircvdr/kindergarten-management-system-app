import Classes from "../models/classesModels/classes.js";

export const createClass = async (req, res) => {
  const classes = req.body;
  try {
    const newClass = new Classes({
      className: classes.className,
      ageGroup: classes.ageGroup,
      classCapacity: classes.classCapacity,
      relatedTeacher: classes.relatedTeacher,
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(409).json({ message: "Sınıf oluşturulamadı", error });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Classes.find({
      isDeleted: false,
    });
    res.status(200).json(classes);
  } catch (error) {
    res.status(404).json({ message: "Sınıflar bulunamadı", error });
  }
};

export const getClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classes = await Classes.findById(id);
    if (!classes) {
      res.status(404).json({ message: "Sınıf bulunamadı" });
    }
    const classesCopy = {
      className: classes.className,
      ageGroup: classes.ageGroup,
      classCapacity: classes.classCapacity,
      relatedTeacher: classes.relatedTeacher,
      isActive: classes.isActive,
    };
    const data = {
      classes: classesCopy,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Sınıf bulunamadı", error });
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const classes = req.body;
  try {
    const updatedClass = await Classes.findByIdAndUpdate(id, {
      className: classes.className,
      ageGroup: classes.ageGroup,
      classCapacity: classes.classCapacity,
      relatedTeacher: classes.relatedTeacher,
      isActive: classes.isActive,
    });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(409).json({ message: "Sınıf güncellenemedi", error });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classes = await Classes.findById(id);
    if (!classes) return res.status(404).json({ message: "Sınıf bulunamadı" });
    await Classes.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ message: "Sınıf silindi" });
  } catch (error) {
    res.status(409).json({ message: "Sınıf silinemedi", error });
  }
};

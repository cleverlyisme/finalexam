const service = require("../services/teacher.service");

const getAllTeachers = async (req, res) => {
  try {
    const { search, filterClass, filterGrade, filterSubject, currentPage } =
      req.query;
    const teachers = await service.getAllTeachers({
      search,
      filterClass,
      filterGrade,
      filterSubject,
      currentPage,
    });

    res.status(200).send(teachers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await service.getTeacher(id);

    res.status(200).send(teacher);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const createTeacher = async (req, res) => {
  try {
    const {
      fullName,
      yearOfBirth,
      gender,
      email,
      phoneNumber,
      mainTeacherOfClass,
      subject,
      teacherOfClasses,
    } = req.body;

    const teacher = await service.createTeacher({
      fullName,
      yearOfBirth,
      gender,
      email,
      phoneNumber,
      mainTeacherOfClass,
      subject,
      teacherOfClasses,
    });

    res.status(200).send(teacher);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      yearOfBirth,
      gender,
      email,
      phoneNumber,
      mainTeacherOfClass,
      subject,
      teacherOfClasses,
    } = req.body;

    const teacher = await service.updateTeacher(id, {
      fullName,
      yearOfBirth,
      gender,
      email,
      phoneNumber,
      mainTeacherOfClass,
      subject,
      teacherOfClasses,
    });

    res.status(200).send(teacher);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteTeacher(id);

    res.status(200).send(true);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getStudentsOfMainClass = async (req, res) => {
  try {
    const { userId } = req;

    const students = await service.getStudentsOfMainClass(userId);

    res.status(200).send({ students });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const getStudentsOfMainClassByDate = async (req, res) => {
  try {
    const { userId } = req;
    const { date } = req.query;

    const students = await service.getStudentsOfMainClassByDate(userId, date);

    res.status(200).send({ students });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const markBreak = async (req, res) => {
  try {
    const { userId } = req;
    const { students, date, withPermission } = req.body;

    const data = await service.markBreak(
      userId,
      students,
      date,
      withPermission
    );

    res.status(200).send({ students: data });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getStudentsOfMainClass,
  getStudentsOfMainClassByDate,
  markBreak,
};

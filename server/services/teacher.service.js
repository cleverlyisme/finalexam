const dayjs = require("dayjs");
const shortid = require("shortid");
const passwordHash = require("password-hash");

const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const { sendEmail } = require("./email.service");
const { ENVIRONMENT } = require("../utils/environments");
const { pageSize, subjects } = require("../utils/constants");
const { createTeacherText, updateTeacherText } = require("../utils/text");

const formatStudents = (students, date) => {
  const formattedStudents = students.map((student) => {
    const dayOffs = student.dayOffs;
    const dateFound = dayOffs.find((day) => {
      return day.date.toISOString() === new Date(date).toISOString();
    });

    return {
      ...student,
      id: student._id,
      mainClass: student.mainClass.name,
      gender: student.gender ? "Nam" : "Nữ",
      dateOfBirth: dayjs(student.dateOfBirth).format("DD-MM-YYYY"),
      status:
        dateFound?.withPermission === 1
          ? "Nghỉ học có phép"
          : dateFound?.withPermission === 0
          ? "Nghỉ học không phép"
          : "Có mặt",
    };
  });

  return formattedStudents || [];
};

const getAllTeachers = async ({
  search,
  filterClass,
  filterGrade,
  filterSubject,
  currentPage,
}) => {
  const filters = {};
  if (search) filters.fullName = { $regex: search, $options: "i" };

  const teachers = await Teacher.find({ ...filters, isDeleted: false })
    .populate("mainTeacherOfClass")
    .populate("teacherOfClasses")
    .lean();

  if (teachers) {
    let totalPage = 1;
    let data = [...teachers].sort((teacher1, teacher2) => {
      return teacher1.fullName.toLowerCase() < teacher2.fullName.toLowerCase()
        ? -1
        : 1;
    });

    if (filterClass) {
      data = data.filter(
        (teacher) =>
          teacher.teacherOfClasses.find((c) => c.name === filterClass) ||
          teacher.mainTeacherOfClass.name === filterClass
      );
    }

    if (filterSubject) {
      data = data.filter((teacher) => teacher.subject === filterSubject);
    }

    const totalTeacher = data.length;

    if (currentPage > 0) {
      totalPage = Math.ceil(data.length / pageSize);
      data = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }

    return {
      data,
      totalPage,
      totalTeacher,
    };
  }

  return {
    data: [],
    totalPage: 1,
    totalTeacher: 0,
  };
};

const getTeacher = async (_id) => {
  const teacher = await Teacher.findOne({ _id, isDeleted: false })
    .populate("mainTeacherOfClass")
    .populate("teacherOfClasses")
    .select("-password")
    .lean();

  if (!teacher) throw new Error("Không tìm thấy giáo viên");

  return teacher || {};
};

const createTeacher = async ({
  fullName,
  yearOfBirth,
  gender,
  email,
  phoneNumber,
  mainTeacherOfClass,
  subject,
  teacherOfClasses,
}) => {
  const teacher = await Teacher.findOne({ email, isDeleted: false });
  if (teacher) {
    throw new Error("Email này đã được sử dụng");
  }

  if (mainTeacherOfClass) {
    const mainClass = await Class.findOne({
      _id: mainTeacherOfClass,
      isDeleted: false,
    });
    if (!mainClass) throw new Error("Lớp học không tồn tại");

    const teacherExists = await Teacher.findOne({
      mainTeacherOfClass,
      isDeleted: false,
    });
    if (teacherExists)
      throw new Error(`Lớp học ${mainClass.name} đã có giáo viên chủ nhiệm`);
  }

  if (teacherOfClasses) {
    for (const item of teacherOfClasses) {
      const classExists = await Class.findOne({ _id: item, isDeleted: false });
      if (!classExists) throw new Error("Lớp học không tồn tại");
    }
  }

  // check if subject is valid
  if (!subjects.includes(subject)) {
    throw new Error(`Môn học không hợp lệ`);
  }

  const classesSameSubject = await Teacher.find({
    subject,
    isDeleted: false,
  })
    .distinct("teacherOfClasses")
    .lean();
  const invalidSubjectClass = await Class.find({
    _id: {
      $in: teacherOfClasses.filter((item) =>
        classesSameSubject?.find((c) => c.toString() == item)
      ),
    },
  });

  const invalidClasses = invalidSubjectClass.map((item) => item.name);

  if (invalidClasses?.length > 0) {
    throw new Error(
      `Lớp học ${invalidClasses.join(", ")} đã có giáo viên môn ${subject}`
    );
  }

  let password = "";
  if (ENVIRONMENT === "DEVELOPMENT") {
    password = "12345678";
  } else {
    password = shortid.generate();
  }
  const newTeacher = new Teacher({
    fullName,
    yearOfBirth,
    gender,
    email,
    password: passwordHash.generate(password),
    phoneNumber,
    mainTeacherOfClass,
    subject,
    teacherOfClasses,
  });
  await newTeacher.save();
  const subjectMail = "[ToEdu School] Thông tin tài khoản giáo viên";
  const bodyMail = createTeacherText
    .replace("$name$", fullName)
    .replace("$email$", email)
    .replace("$password$", password);
  await sendEmail(email, subjectMail, bodyMail);
};

const updateTeacher = async (
  _id,
  {
    fullName,
    yearOfBirth,
    gender,
    email,
    phoneNumber,
    mainTeacherOfClass,
    subject,
    teacherOfClasses,
  }
) => {
  const teacher = await Teacher.findOne({ _id, isDeleted: false });
  if (!teacher) {
    throw new Error("Không tìm thấy thông tin giáo viên");
  }

  if (mainTeacherOfClass) {
    const mainClass = await Class.findOne({
      _id: mainTeacherOfClass,
      isDeleted: false,
    });
    if (!mainClass) throw new Error("Lớp học không tồn tại");

    const teacherExists = await Teacher.findOne({
      _id: { $ne: _id },
      mainTeacherOfClass,
      isDeleted: false,
    });
    if (teacherExists)
      throw new Error(`Lớp học ${mainClass.name} đã có giáo viên chủ nhiệm`);
  }

  if (teacherOfClasses) {
    for (const item of teacherOfClasses) {
      const classExists = await Class.findOne({ _id: item, isDeleted: false });
      if (!classExists) throw new Error("Lớp học không tồn tại");
    }
  }

  // check if subject is valid
  if (!subjects.includes(subject)) {
    throw new Error(`Môn học không hợp lệ`);
  }

  const classesSameSubject = await Teacher.find({
    _id: { $ne: _id },
    subject,
    isDeleted: false,
  })
    .distinct("teacherOfClasses")
    .lean();
  const invalidSubjectClass = await Class.find({
    _id: {
      $in: teacherOfClasses.filter((item) =>
        classesSameSubject?.find((c) => c.toString() == item)
      ),
    },
  });

  const invalidClasses = invalidSubjectClass.map((item) => item.name);

  if (invalidClasses?.length > 0) {
    throw new Error(
      `Lớp học ${invalidClasses.join(", ")} đã có giáo viên môn ${subject}`
    );
  }

  teacher.fullName = fullName || teacher.fullName;
  teacher.email = email || teacher.email;
  teacher.phoneNumber = phoneNumber || teacher.phoneNumber;
  teacher.gender = gender || teacher.gender;
  teacher.yearOfBirth = yearOfBirth || teacher.yearOfBirth;
  teacher.mainTeacherOfClass = mainTeacherOfClass || teacher.mainTeacherOfClass;
  teacher.subject = subject || teacher.subject;
  teacher.teacherOfClasses = teacherOfClasses || teacher.teacherOfClasses;

  await teacher.save();

  const subjectMail = "[ToEdu School] Cập nhật thông tin tài khoản giáo viên";
  const bodyMail = updateTeacherText;
  await sendEmail(email, subjectMail, bodyMail);
};

const deleteTeacher = async (_id) => {
  const teacher = await Teacher.findOne({
    _id,
    isDeleted: false,
  });

  if (!teacher) {
    throw new Error("Giáo viên không tồn tại");
  }

  teacher.isDeleted = true;
  await teacher.save();
};

const getStudentsOfMainClass = async (_id) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Giáo viên không tồn tại");

  const students = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  const formattedStudents = students.map((student) => ({
    ...student,
    mainClass: student.mainClass.name,
    gender: student.gender ? "Nam" : "Nữ",
    dateOfBirth: dayjs(student.dateOfBirth).format("DD-MM-YYYY"),
  }));

  return formattedStudents || [];
};

const getStudentsOfMainClassByDate = async (_id, date) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Giáo viên không tồn tại");

  const students = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  return formatStudents(students, date);
};

const markBreak = async (_id, students, date, withPermission) => {
  const teacher = await Teacher.findOne({ _id }).lean();

  if (!teacher) throw new Error("Giáo viên không tồn tại");

  for (const studentId of students) {
    const student = await Student.findOne({ _id: studentId });

    student.dayOffs = student.dayOffs.filter(
      (day) =>
        day.date.toISOString().slice(0, 10) !==
        new Date(date).toISOString().slice(0, 10)
    );

    student.dayOffs = [
      ...student.dayOffs,
      {
        date: new Date(date).toISOString(),
        withPermission,
      },
    ];

    await student.save();
  }

  const studentsData = await Student.find({
    mainClass: teacher.mainTeacherOfClass,
  })
    .populate("mainClass")
    .lean();

  return formatStudents(studentsData, date);
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

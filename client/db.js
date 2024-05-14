const schools = [name, address, description, phone, createdAt];

const teachers = [
  schoolId,
  firstName,
  lastName,
  gender,
  birth,
  avatar,
  email,
  password,
];

const parents = [
  studentId,
  firstName,
  lastName,
  phone,
  address,
  avatar,
  email,
  password,
];

const students = [
  schoolId,
  classId,
  firstName,
  lastName,
  gender,
  birth,
  avatar,
  email,
  password,
];

const classes = [schoolId, teacherId, name];

const subjects = [name, description];

const lessons = [classId, subjectId, teacherId, studentsId, period, date];

const marks = [studentId, subjectId, (marks = [])];

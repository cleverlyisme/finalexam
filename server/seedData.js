const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const _ = require("lodash");
const {
  subjects,
  scores,
  conducts,
  ranks,
  status,
} = require("./utils/constants");

const Admin = require("./models/admin.model");
const Semester = require("./models/semester.model");
const Parent = require("./models/parent.model");
const Teacher = require("./models/teacher.model");
const Class = require("./models/class.model");
const Student = require("./models/student.model");
const Highlight = require("./models/highlight.model");
const Event = require("./models/event.model");
const Schedule = require("./models/schedule.model");
const Fee = require("./models/fee.model");
// const Event = require("./models/event.model");

const { MONGO_ATLAS_URI } = require("./utils/environments");

mongoose.connect(MONGO_ATLAS_URI, {
  autoIndex: true,
  autoCreate: true,
});

const password = passwordHash.generate("password");
const dateOfBirth = (year) => {
  const day = Math.floor(Math.random() * 27 + 1);
  const month = _.sample([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  return `${month} ${day} ${year} 11:59:55 GMT+0700 (Indochina Time)`;
};

// function that render random names
const firstNames = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Mai",
  "Hoàng",
  "Đinh",
  "Đỗ",
  "Phạm",
  "Vũ",
  "Ngô",
  "Lý",
  "Bùi",
  "Đặng",
  "Phan",
  "Dương",
];

const middleNames = [
  "Việt",
  "Văn",
  "Quốc",
  "Tuấn",
  "Lâm",
  "Hoàng",
  "Trọng",
  "Thị",
  "Thùy",
  "Minh",
  "Thu",
  "Linh",
  "Huy",
  "Hải",
  "Mai",
  "Phương",
  "Quang",
  "Ngọc",
];

const lastNames = [
  "Hưng",
  "Hoàng",
  "Anh",
  "Hùng",
  "Hằng",
  "Hiệp",
  "Long",
  "Trung",
  "Duy",
  "Dương",
  "Linh",
  "Ngân",
  "Nguyệt",
  "Ly",
  "Nam",
  "Chính",
  "Hải",
  "Ngọc",
  "Đông",
  "Đức",
  "Thái",
  "Quang",
  "Ánh",
  "Khôi",
  "Tuấn",
  "Dũng",
  "Tùng",
  "Huy",
  "Trường",
  "Nam",
  "Giang",
  "Hiếu",
  "Phương",
  "Hà",
  "Minh",
  "Lan",
  "Trang",
  "Huyền",
  "Tân",
  "Đạt",
];

const renderName = () => {
  const firstName = _.sample(firstNames);
  const studentName = `${firstName} ${_.sample(middleNames)} ${_.sample(
    lastNames
  )}`;

  const fatherName = `${firstName} ${_.sample(middleNames)} ${_.sample(
    lastNames
  )}`;

  const motherName = `${_.sample(firstNames)} ${_.sample(
    middleNames
  )} ${_.sample(lastNames)}`;

  return {
    studentName,
    fatherName,
    motherName,
  };
};

// function that render random address
const districts = [
  "Hoàn Kiếm",
  "Đống Đa",
  "Ba Đình",
  "Hai Bà Trưng",
  "Hoàng Mai",
  "Thanh Xuân",
  "Long Biên",
  "Nam Từ Liêm",
  "Bắc Từ Liêm",
  "Tây Hồ",
  "Cầu Giấy",
  "Hà Đông",
  "Sơn Tây",
  "Ba Vì",
  "Chương Mỹ",
  "Phúc Thọ",
  "Đan Phượng",
  "Đông Anh",
  "Gia Lâm",
  "Hoài Đức",
  "Mê Linh",
  "Mỹ Đức",
  "Phú Xuyên",
  "Quốc Oai",
  "Sóc Sơn",
  "Thạch Thất",
  "Thanh Oai",
  "Thường Tín",
  "Ứng Hòa",
  "Thanh Trì",
];

const renderAddress = () => `${_.sample(districts)}, Hà Nội`;

function randomDate(start, end) {
  const timestamp =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(timestamp);
}

const semesters = [
  {
    from: 2023,
    to: 2024,
    semester: 1,
  },
  {
    from: 2023,
    to: 2024,
    semester: 2,
  },
  {
    from: 2024,
    to: 2025,
    semester: 1,
  },
  {
    from: 2024,
    to: 2025,
    semester: 2,
  },
];

const classes = [
  "10A1",
  "10A2",
  "10A3",
  "11A1",
  "11A2",
  "11A3",
  "12A1",
  "12A2",
  "12A3",
  "10D1",
  "10D2",
  "10D3",
  "11D1",
  "11D2",
  "11D3",
  "12D1",
  "12D2",
  "12D3",
];

async function createAdmin() {
  console.log("Creating admin...");
  const newAdmin = new Admin({
    fullName: "Đào Tuấn Anh",
    email: "admin@gmail.com",
    password,
  });
  await newAdmin.save();
}

async function createSemesters() {
  console.log("Creating semester...");
  for (const semester of semesters) {
    const newSemester = new Semester({
      from: semester.from,
      to: semester.to,
      semester: semester.semester,
    });
    await newSemester.save();
  }
}

async function createClasses() {
  console.log("Creating classes...");
  for (const className of classes) {
    const newClass = new Class({
      name: className,
      grade: Number(className.slice(0, 2)),
    });
    await newClass.save();
  }
}

const getRandomClassId = async () =>
  (await Class.aggregate([{ $sample: { size: 1 } }]))[0]._id;

const getSemesters = async () => await Semester.find({ from: 2023 });

const getRandomStudentId = async () =>
  (await Student.aggregate([{ $sample: { size: 1 } }]))[0]._id;

async function createTeacher(classId) {
  console.log("Creating teacher...");
  const newTeacher = new Teacher({
    fullName: "Nguyễn Thị Thuận",
    email: "thuan@gmail.com",
    password,
    yearOfBirth: 1996,
    gender: 0,
    phoneNumber: "0337223434",
    mainTeacherOfClass: classId,
    teacherOfClasses: [classId],
    subject: "Toán",
  });
  await newTeacher.save();
}

async function createStudents(classId, semesters) {
  console.log("Creating students...");
  for (let i = 0; i < 45; i++) {
    const newStudent = new Student({
      fullName: renderName().studentName,
      dateOfBirth: randomDate(new Date(2008, 0, 1), new Date(2008, 11, 28)),
      gender: Math.random() < 0.5,
      mainClass: classId,
      dayOffs: [],
    });

    for (const semester of semesters) {
      newStudent.scores = [
        ...newStudent.scores,
        {
          semester: semester._id,
          detail: scores,
        },
      ];
      newStudent.finalScore = [
        ...newStudent.finalScore,
        {
          semester: semester._id,
          score: _.random(8, 10),
        },
      ];
      newStudent.conducts = [
        ...newStudent.conducts,
        {
          semester: semester._id,
          conduct: _.sample(conducts),
        },
      ];
      newStudent.subjectTotalScore = [
        ...newStudent.subjectTotalScore,
        {
          time: semester.from + "-" + semester.to,
          detail: {
            math: _.random(8, 10),
            literature: _.random(8, 10),
            english: _.random(8, 10),
            physics: _.random(8, 10),
            chemistry: _.random(8, 10),
            biology: _.random(8, 10),
            geography: _.random(8, 10),
            history: _.random(8, 10),
            law: _.random(8, 10),
            music: _.random(8, 10),
            art: _.random(8, 10),
            sport: _.random(8, 10),
          },
        },
      ];
      newStudent.totalScore = [
        ...newStudent.totalScore,
        {
          time: semester.from + "-" + semester.to,
          score: _.random(8, 10),
        },
      ];
      newStudent.totalConducts = [
        ...newStudent.totalConducts,
        {
          time: semester.from + "-" + semester.to,
          score: _.sample(conducts),
        },
      ];
      newStudent.totalResult = [
        ...newStudent.totalConducts,
        {
          time: semester.from + "-" + semester.to,
          rank: _.sample(ranks),
        },
      ];
    }
    await newStudent.save();
  }
}

async function createParent(studentId) {
  console.log("Creating parent...");

  const newParent = new Parent({
    email: "thuan@gmail.com",
    phoneNumber: "0337223434",
    password,
    student: studentId,
    father: {
      fullName: "Đào Văn Thỉnh",
      yearOfBirth: 1948,
    },
    mother: {
      fullName: "Nguyễn Thị Thuận",
      yearOfBirth: 1949,
    },
  });
  await newParent.save();
}

async function createSchedules(classSchedule) {
  console.log("Creating schedules...");
  const classes = await Class.find({});

  for (const classRoom of classes) {
    const shuffleSubjects = _.shuffle(lessons);
    const schedule = ["Chào cờ", ...shuffleSubjects, "Sinh hoạt"];

    const classSchedule = {
      class: classRoom._id,
      schedule: {
        mon: {
          morning: schedule.slice(0, 5),
          afternoon: schedule.slice(5, 9),
        },
        tue: {
          morning: schedule.slice(5, 10),
          afternoon: schedule.slice(5, 9),
        },
        wed: {
          morning: schedule.slice(10, 15),
          afternoon: schedule.slice(5, 9),
        },
        thu: {
          morning: schedule.slice(15, 20),
          afternoon: schedule.slice(15, 19),
        },
        fri: {
          morning: schedule.slice(20, 25),
          afternoon: schedule.slice(20, 24),
        },
        sat: {
          morning: schedule.slice(20, 25),
          afternoon: schedule.slice(20, 24),
        },
      },
    };
    const newSchedule = new Schedule(classSchedule);
    await newSchedule.save();
  }
}

const highlight = {
  title: "Kế hoạch tham quan dã ngoại trường THCS Dev School",
  content:
    "<p>Do t&igrave;nh h&igrave;nh nghỉ học c&aacute;ch ly k&eacute;o d&agrave;i, thời gian học sinh được sinh hoạt c&ugrave;ng nhau l&agrave; rất &iacute;t trong năm học n&agrave;y. V&igrave; thế nh&agrave; trường quyết định tổ chức một buổi d&atilde; ngoại k&eacute;o d&agrave;i 2 ng&agrave;y 1 đ&ecirc;m cho c&aacute;c em học sinh khối 6, 7, 8. C&aacute;c em học sinh khối 9 do thời gian c&ograve;n lại của năm học rất &iacute;t, n&ecirc;n để đảm bảo chất lượng cho kỳ thi chuyển cấp được diễn ra v&agrave;o cuối th&aacute;ng 7, c&aacute;c em sẽ học b&igrave;nh thường tại trường.</p><p>Thời gian buổi d&atilde; ngoại: 13 - 14/6/2020</p><p>Địa điểm d&atilde; ngoại: Ba V&igrave;, H&agrave; Nội</p><p>Lịch tr&igrave;nh chi tiết c&aacute;c gi&aacute;o vi&ecirc;n chủ nhiệm sẽ phổ biến đến c&aacute;c em v&agrave;o buổi sinh hoạt cuối tuần n&agrave;y.</p>",
  time: "Fri May 22 2020 18:34:23 GMT+0700 (Indochina Time)",
  isDeleted: false,
};

const event = {
  time: "Tue May 14 2024 00:00:00 GMT+0700 (Indochina Time)",
  content: "Dã ngoại 2 ngày 1 đêm",
};

async function createHighlight() {
  console.log("Creating highlights...");
  const newHighlight = new Highlight(highlight);
  await newHighlight.save();
}

async function createEvent() {
  console.log("Creating event");
  const newEvent = new Event(event);
  await newEvent.save();
}

const fees = [
  {
    title: "Tiền học phí kì 2 năm học 2023 - 2024",
    description: "Tiền học phí kì 2 năm học 2023 - 2024 khối 10, 11",
    amount: 3000000,
    type: "tuition",
    from: "Fri May 22 2023 12:00:00 GMT+0700 (Indochina Time)",
    to: "Fri June 19 2023 12:00:00 GMT+0700 (Indochina Time)",
  },
  {
    title: "Tiền đồng phục thể dục",
    description:
      "Tiền đồng phục thể dục cho học sinh khổi 11 năm học 2023 - 2024",
    amount: 250000,
    type: "others",
    from: "Fri May 22 2023 12:00:00 GMT+0700 (Indochina Time)",
    to: "Fri May 29 2023 12:00:00 GMT+0700 (Indochina Time)",
  },
];

async function createFees(semesters) {
  console.log("Creating fees...");
  const studentFees = [];
  for (const semester of semesters)
    for (const fee of fees) {
      const newFee = new Fee({ ...fee, semester: semester._id });
      await newFee.save();
      studentFees.push(newFee._id);
    }

  const students = await Student.find({});

  for (const student of students)
    for (const fee of studentFees) {
      student.fees = [
        ...student.fees,
        {
          fee,
          status: _.sample(status),
        },
      ];
      await student.save();
    }
}

const seed = async () => {
  await Admin.deleteMany({});
  await Semester.deleteMany({});
  await Class.deleteMany({});
  await Teacher.deleteMany({});
  await Student.deleteMany({});
  await Parent.deleteMany({});
  await Schedule.deleteMany({});
  await Highlight.deleteMany({});
  await Event.deleteMany({});
  console.log("Deleted old datas");

  await createAdmin();
  console.log("Created admin");

  await createSemesters();
  console.log("Created semesters");

  await createClasses();
  console.log("Created classes");

  const classId = await getRandomClassId();

  await createTeacher(classId);
  console.log("Created teacher");

  const semesters = await getSemesters();
  await createStudents(classId, semesters);
  console.log("Created students");

  const studentId = await getRandomStudentId();

  await createParent(studentId);
  console.log("Created parent");

  await createSchedules();
  console.log("Created schedules");

  await createHighlight();
  console.log("Created highlights");

  await createEvent();
  console.log("Created event");

  await createFees(semesters);
  console.log("Created fees");

  console.log("Done!");
};

seed();

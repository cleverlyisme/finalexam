const jsonwebtoken = require("jsonwebtoken");
const passwordHash = require("password-hash");

const Admin = require("../models/admin.model");
const Teacher = require("../models/teacher.model");
const Parent = require("../models/parent.model");
const { sendVerifyToken } = require("./email.service");

const { JWT_SECRET_KEY } = require("../utils/environments");

const login = async (email, password, role) => {
  switch (role) {
    case "admin": {
      const admin = await Admin.findOne({ email }).lean();
      if (!admin) throw new Error("Invalid email or password");

      const isPassed = passwordHash.verify(password, admin.password);
      if (!isPassed) throw new Error("Invalid email or password");

      const { _id, fullName, avatar } = admin;

      return {
        token: jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
          expiresIn: "30d",
        }),
        user: { _id, fullName, avatar, role },
      };
    }

    case "teacher": {
      const teacher = await Teacher.findOne({ email })
        .populate("mainTeacherOfClass")
        .populate("teacherOfClasses")
        .lean();
      if (!teacher) throw new Error("Invalid email or password");

      const isPassed = passwordHash.verify(password, teacher.password);
      if (!isPassed) throw new Error("Invalid email or password");

      const {
        _id,
        fullName,
        yearOfBirth,
        gender,
        phoneNumber,
        mainTeacherOfClass,
        teacherOfClasses,
        subject,
        avatar,
      } = teacher;

      return {
        token: jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
          expiresIn: "30d",
        }),
        user: {
          _id,
          fullName,
          yearOfBirth,
          gender,
          phoneNumber,
          mainTeacherOfClass,
          teacherOfClasses,
          subject,
          avatar,
          role,
        },
      };
    }

    case "parent": {
      const parent = await Parent.findOne({ email }).populate({
        path: "student",
        populate: {
          path: "mainClass"
        }
      }).lean();
      if (!parent) throw new Error("Invalid email or password");

      const isPassed = passwordHash.verify(password, parent.password);
      if (!isPassed) throw new Error("Invalid email or password");

      const { _id, father, mother, student, avatar } = parent;

      return {
        token: jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
          expiresIn: "30d",
        }),
        user: { _id, father, mother, avatar, student, role },
      };
    }

    default:
      throw new Error("Invalid role");
  }
};

const checkAuth = async (_id, role) => {
  switch (role) {
    case "admin": {
      const user = await Admin.findOne({ _id })
        .select(["-password", "-__v"])
        .lean();

      return { ...user, role };
    }

    case "teacher": {
      const user = await Teacher.findOne({ _id })
        .select(["-password", "-__v"])
        .populate("mainTeacherOfClass")
        .populate("teacherOfClasses")
        .lean();

      return { ...user, role };
    }

    case "parent": {
      const user = await Parent.findOne({ _id })
        .select(["-password", "-__v"])
        .populate({
          path: "student",
          populate: {
            path: "mainClass"
          }
        })
        .lean();

      return { ...user, role };
    }
  }
};

module.exports = { login, checkAuth };

const _ = require("lodash");

const pageSize = 25;

const roles = {
  Admin: "admin",
  Teacher: "teacher",
  Parent: "parent",
};

const subjects = [
  "Toán",
  "Văn",
  "Anh",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Địa",
  "Sử",
  "GDCD",
  "Âm nhạc",
  "Mỹ thuật",
  "Thể dục",
];

const randomScores = () => {
  return {
    x1: [_.random(7, 10), _.random(7, 10), _.random(7, 10)],
    x2: [_.random(7, 10), _.random(7, 10)],
    x3: [_.random(7, 10)],
    medium: _.random(7, 10),
  };
};

const scores = {
  math: randomScores(),
  literature: randomScores(),
  english: randomScores(),
  physics: randomScores(),
  chemistry: randomScores(),
  biology: randomScores(),
  geography: randomScores(),
  history: randomScores(),
  law: randomScores(),
  music: randomScores(),
  art: randomScores(),
  sport: randomScores(),
};

const conducts = ["Tốt", "Khá", "Trung bình", "Yếu"];

const ranks = ["Giỏi", "Tiên tiến"];

const status = ["paid", "not-paid", "canceled"];

module.exports = { pageSize, roles, subjects, scores, conducts, ranks, status };

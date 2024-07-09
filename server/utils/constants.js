const _ = require("lodash");

const roles = {
  Admin: "admin",
  Teacher: "teacher",
  Parent: "parent",
};

const lessons = [
  "Văn",
  "Văn",
  "Văn",
  "Văn",
  "Toán",
  "Toán",
  "Toán",
  "Toán",
  "Vật lý",
  "Vật lý",
  "Hóa học",
  "Hóa học",
  "Sinh học",
  "Sinh học",
  "Anh",
  "Anh",
  "Anh",
  "Sử",
  "Địa",
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

module.exports = { roles, lessons, scores, conducts, ranks, status };

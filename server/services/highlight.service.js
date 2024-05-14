const dayjs = require("dayjs");
const moment = require("moment");

const Highlight = require("../models/highlight.model");

const getAllHighlights = async (currentPage, searchString) => {
  let totalPage = 1;
  const hightlights = await Highlight.find({ isDeleted: false });

  let data = [...hightlights].sort((item1, item2) => {
    return new Date(item1.time).getTime() < new Date(item2.time).getTime()
      ? 1
      : -1;
  });

  if (searchString) {
    data = data.filter((highlight) =>
      highlight.title.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  if (currentPage > 0) {
    totalPage = Math.ceil(data.length / pageSize) || 1;

    data = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }

  return { data, totalPage };
};

const getHighlight = async (_id) => {
  const highlight = await Highlight.findOne({
    _id,
    isDeleted: false,
  });

  if (!highlight) {
    throw new Error("Không có thông báo");
  }

  return { highlight };
};

const createHighlight = async (data) => {
  const newHighlight = new Highlight(data);
  await newHighlight.save();
};

const updateHighlight = async (_id, data) => {
  const { title, content, time } = data;

  const highlight = await Highlight.findOne({ _id, isDeleted: false });
  if (!highlight) throw new Error("Thông báo không tồn tại");

  highlight.title = title;
  highlight.content = content;
  highlight.time = time;
  await highlight.save();
};

const deleteHighlight = async (_id) => {
  const highlight = await Highlight.findOne({
    _id,
    isDeleted: false,
  });

  if (!highlight) {
    throw new Error("Thông báo không tồn tại");
  }

  highlight.isDeleted = true;
  await highlight.save();
};

const getLastestHighlights = async () => {
  const hightlights = await Highlight.find({ isDeleted: false });

  let data = [...hightlights].sort((item1, item2) => {
    return new Date(item1.time).getTime() < new Date(item2.time).getTime()
      ? 1
      : -1;
  });
  data = data.slice(0, 10);

  return data;
};

module.exports = {
  getAllHighlights,
  getHighlight,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  getLastestHighlights,
};

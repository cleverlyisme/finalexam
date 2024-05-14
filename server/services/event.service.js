const Event = require("../models/event.model");

const getAllEvents = async (currentPage, searchString) => {
  let totalPage = 1;
  const events = await Event.find({ isDeleted: false });

  let data = [...events].sort((item1, item2) => {
    return new Date(item1.time).getTime() < new Date(item2.time).getTime()
      ? 1
      : -1;
  });

  if (searchString) {
    data = data.filter((event) =>
      event.content.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  if (currentPage > 0) {
    totalPage = Math.ceil(data.length / pageSize) || 1;

    data = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }

  return { data, totalPage };
};

const getEvent = async (_id) => {
  const event = await Event.findOne({
    _id,
    isDeleted: false,
  });

  if (!event) {
    throw new Error("Không có thông báo");
  }

  return { event };
};

const createEvent = async (data) => {
  const newEvent = new Event(data);
  await newEvent.save();
};

const updateEvent = async (_id, data) => {
  const { title, content, time } = data;

  const event = await Event.findOne({ _id, isDeleted: false });
  if (!event) throw new Error("Thông báo không tồn tại");

  event.content = content;
  event.time = time;
  await event.save();
};

const deleteEvent = async (_id) => {
  const event = await Event.findOne({
    _id,
    isDeleted: false,
  });

  if (!event) {
    throw new Error("Thông báo không tồn tại");
  }

  event.isDeleted = true;
  await event.save();
};

const getLastestEvents = async () => {
  const events = await Event.find({ isDeleted: false });

  let data = [...events].sort((item1, item2) => {
    return new Date(item1.time).getTime() < new Date(item2.time).getTime()
      ? 1
      : -1;
  });
  data = data.slice(0, 10);

  return data;
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getLastestEvents,
};

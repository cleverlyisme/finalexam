import { Store } from "react-notifications-component";

export default (noti) => {
  const { title, message, type } = noti;

  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      showIcon: true,
    },
    width: 400,
  });
};

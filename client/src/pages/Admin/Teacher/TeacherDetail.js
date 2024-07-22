import { useNavigate, useParams } from "react-router-dom";
import Teacher from "../../../components/Teacher";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) return <Teacher id={id} navigate={navigate} />;

  return <Teacher navigate={navigate} />;
};

export default TeacherDetail;

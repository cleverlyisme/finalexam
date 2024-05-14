import "dayjs/locale/vi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import timezone from "dayjs/plugin/timezone";

import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import useAppContext from "../../hooks/useAppContext";
import TeacherLayout from "../../components/Layout";
import {
  getStudentsOfMainClass,
  markBreakStudent,
} from "../../services/teacher.service";

dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.locale("vi");
// dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const StatusCellRenderer = ({ value }) => (
  <span
    style={{
      color:
        value === "Có mặt"
          ? "green"
          : value === "Nghỉ học có phép"
          ? "orange"
          : "red",
    }}
  >
    {value}
  </span>
);

const StudentAttendance = () => {
  const [dateValue, setDateValue] = useState(dayjs());
  const [data, setData] = useState({
    columns: [
      { field: "id", hide: true },
      { field: "fullName", headerName: "Họ và tên", width: 180 },
      { field: "dateOfBirth", headerName: "Ngày sinh", width: 100 },
      { field: "gender", headerName: "Giới tính", width: 80 },
      { field: "mainClass", headerName: "Lớp", width: 80 },
      {
        field: "status",
        headerName: "Tình trạng",
        width: 140,
        renderCell: (params) => <StatusCellRenderer value={params.value} />,
      },
    ],
    initialState: {
      columns: { columnVisibilityModel: { id: false } },
    },
  });
  const [selectedStudents, setSelectedStudents] = useState([]);

  const {
    loadingState: { setIsLoading },
  } = useAppContext();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentsOfMainClass({
        date: dateValue.format("YYYY-MM-DD"),
      });
      const students = response.data.students;
      setData({ ...data, rows: students });
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  const handleMark = async (status) => {
    setIsLoading(true);
    try {
      if (!selectedStudents.length) throw new Error();

      const response = await markBreakStudent({
        students: selectedStudents,
        date: dateValue.format("YYYY-MM-DD"),
        withPermission: status,
      });
      const students = response.data.students;
      setData({ ...data, rows: students });

      toast.success("Đánh dấu thành công");
    } catch (err) {
      toast.error(
        selectedStudents.length
          ? "Đánh dấu thất bại. Vui lòng thử lại"
          : "Vui lòng chọn sinh viên"
      );
      console.log({ err });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [dateValue]);

  return (
    <TeacherLayout>
      <div className="flex flex-colo p-8 gap-6">
        <h2>Điểm danh học sinh</h2>
        <div className="w-full flex justify-evenly gap-4">
          <div>
            <h4 className="px-4">Chọn ngày học</h4>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDatePicker"]}>
                <DemoItem>
                  <StaticDatePicker
                    value={dayjs.tz(dateValue, "Asia/Ho_Chi_Minh")}
                    onChange={(d) =>
                      setDateValue(dayjs.tz(d, "Asia/Ho_Chi_Minh"))
                    }
                    timezone="Asia/Ho_Chi_Minh"
                    disableFuture
                    sx={{
                      "& .MuiDialogActions-root": {
                        display: "none",
                      },
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="space-y-4">
            <h4>Danh sách học sinh</h4>
            <div>
              <span className="italic font-semibold">
                Ngày {dateValue.format("DD/MM/YYYY")}
              </span>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                checkboxSelection
                disableRowSelectionOnClick
                {...data}
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedStudents(newSelection);
                }}
                sx={{
                  "& p": {
                    margin: 0,
                  },
                }}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="font-bold">Đánh dấu:</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <button
                    className="px-2 py-1 rounded font-semibold text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transitions"
                    onClick={() => handleMark(2)}
                  >
                    Có mặt
                  </button>
                </div>
                <button
                  className="px-2 py-1 rounded font-semibold text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transitions"
                  onClick={() => handleMark(1)}
                >
                  Vắng mặt có phép
                </button>
                <button
                  className="px-2 py-1 rounded font-semibold text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transitions"
                  onClick={() => handleMark(0)}
                >
                  Vắng mặt không phép
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default StudentAttendance;

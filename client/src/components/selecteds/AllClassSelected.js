import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllClasses } from "../../services/class.service";

export default (props) => {
  const [options, setOptions] = useState([]);

  const getClasses = async () => {
    try {
      const res = await getAllClasses();
      const classes = res.data.map((c) => ({ label: c.name, value: c._id }));
      setOptions(classes);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    if (!props.viewOnly) {
      getClasses();
    }
  }, []);

  return (
    <Select
      placeholder="Chọn lớp học"
      options={options}
      onChange={props.onChange}
      {...props}
    />
  );
};

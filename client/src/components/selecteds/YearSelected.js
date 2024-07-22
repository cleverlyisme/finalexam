import Select from "react-select";

var yearNow = new Date().getFullYear();
var minYear = yearNow - 100;
var maxYear = yearNow - 18;

var options = [];
for (let year = minYear; year < maxYear; year++) {
  options = [...options, { value: year.toString(), label: year }];
}

export default function (props) {
  return (
    <Select
      placeholder={props.placeholder || "Chọn năm"}
      options={options}
      onChange={props.onChange}
      {...props}
    />
  );
}

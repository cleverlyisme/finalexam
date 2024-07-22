import React, { useEffect, useState } from "react";
import Select from "react-select";

import { grades } from "../../utils/constants";

export default function (props) {
  return (
    <Select
      placeholder={props.placeholder || "Chọn khối học"}
      options={grades}
      onChange={props.onChange}
      {...props}
    />
  );
}

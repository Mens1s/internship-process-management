import React, { useEffect, useState } from "react";
import axios from "src/services/axios";
import { Select } from "antd";
import { API } from "src/config/api";

interface Department {
  id: number;
  name: string;
}

const useDepartments = () => {
  const [departmentOptions, setDepartmentOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    axios
      .get(API.DEPARTMENT.GET_ALL)
      .then((response) => {
        const departments: Department[] = response.data.departmentList;

        setDepartmentOptions(
          departments.map((department) => (
            <Select.Option key={department.id} value={department.id}>
              {department.name}
            </Select.Option>
          ))
        );
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  }, []);

  return departmentOptions;
};

export default useDepartments;

import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  createPersonnelSchema,
  updatePersonnelSchema,
} from "../utility/schemas";

const usePersonnel = () => {
  const navigate = useNavigate();

  // create personnel controller
  const createPersonnelController = useFormik({
    initialValues: {
      users_name: "",
      users_family: "",
      users_phone: "",
      nationale_code: "",
      roles_ids: "",
      roles_names: "",
      semat_id: "",
      city_id: "",
      city_path: "",
      agent_id: "",
      agent_path: "",
      account_locked: "0",
      employee_date: null,
      image_file_name: "",
      image_mime_type: "",
      password: "",
      created_by: "",
      user_type: "",
    },
    validationSchema: createPersonnelSchema,
    onSubmit: (values) => {
      handleCreatePersonnel(values);
    },
  });

  // create personnel api request
  const handleCreatePersonnel = async (values) => {
    console.log(values);
    toast.success("کاربر با موفقیت ایجاد شد.");
    navigate("/personnel/all");
  };

  // update personnel controller
  const updatePersonnelController = useFormik({
    initialValues: {
      users_name: "",
      users_family: "",
      users_phone: "",
      nationale_code: "",
      roles_ids: "",
      roles_names: "",
      semat_id: "",
      city_id: "",
      city_path: "",
      agent_id: "",
      agent_path: "",
      account_locked: "0",
      employee_date: null,
      image_file_name: "",
      image_mime_type: "",
      password: "",
      created_by: "",
      user_type: "",
    },
    validationSchema: updatePersonnelSchema,
    onSubmit: (values) => {
      handleUpdatePersonnel(values);
    },
  });

  // update personnel api request
  const handleUpdatePersonnel = async (values) => {
    console.log(values);
    toast.success("کاربر با موفقیت ویرایش شد.");
    navigate("/personnel/all");
  };

  const exports = { createPersonnelController, updatePersonnelController };
  return exports;
};
export default usePersonnel;

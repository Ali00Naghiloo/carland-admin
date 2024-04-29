import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createProviderSchema, updateProviderSchema } from "../utility/schemas";

const useProvider = () => {
  const navigate = useNavigate();

  // create provider controller
  const createProviderController = useFormik({
    initialValues: {
      agent_name: "",
      grade: null,
      agent_phone: "",
      province_id: null,
      city_id: null,
      postal_code: "",
      agent_enabled: "1",
      address: "",
      national_id: "",
      birth_certificate_id: "",
      birthday_date: null,
      father_name: "",
      national_id_location: null,
    },
    validationSchema: createProviderSchema,
    onSubmit: (values) => {
      handleCreateProvider(values);
    },
  });

  // create provider api request
  const handleCreateProvider = async (values) => {
    console.log(values);
    toast.success("نماینده با موفقیت ایجاد شد.");
    navigate("/providers/all");
  };

  // update provider controller
  const updateProviderController = useFormik({
    initialValues: {
      agent_name: "",
      grade: null,
      agent_phone: "",
      province_id: null,
      city_id: null,
      postal_code: "",
      agent_enabled: "1",
      address: "",
      national_id: "",
      birth_certificate_id: "",
      birthday_date: null,
      father_name: "",
      national_id_location: null,
    },
    enableReinitialize: true,
    validationSchema: updateProviderSchema,
    onSubmit: (values) => {
      handleUpdateProvider(values);
    },
  });

  // update provider api request
  const handleUpdateProvider = async (values) => {
    console.log(values);
    toast.success("نماینده با موفقیت ویرایش شد.");
    navigate("/providers/all");
  };

  const exports = { createProviderController, updateProviderController };
  return exports;
};
export default useProvider;

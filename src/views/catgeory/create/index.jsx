import { Fragment, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import {
  Col,
  Form,
  Row,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  Card,
  CardFooter,
  FormFeedback,
  Button,
} from "reactstrap";
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useCategory from "../../../hooks/use_category";
import avatarBlank from "../../../assets/images/avatars/avatar-blank.png";

const CreateCategory = () => {
  const { getSelectCategories, createCategoryController, loadings } =
    useCategory();

  const [fileUri, setFileUri] = useState(null);

  const handleUploadImage = (e) => {
    if (e?.target?.files[0] !== undefined) {
      setFileUri(URL.createObjectURL(e.target.files[0]));
      var reader = new FileReader();
      reader.onloadend = function () {
        createCategoryController.setFieldValue("images", reader.result);
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد دسته بندی جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد دسته بندی جدید" }]}
      />
      <Form onSubmit={createCategoryController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد دسته بندی جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* upload avatar */}
            <div className="d-flex flex-column align-items-center mb-3">
              <div className="mb-1">
                <img
                  style={{
                    objectFit: "cover",
                    border: "1px solid rgba(226, 226, 226, 0.366)",
                  }}
                  className="rounded"
                  src={fileUri ? fileUri : avatarBlank}
                  alt="Generic placeholder image"
                  height="100"
                  width="100"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <Button
                    tag={Label}
                    // disabled={loadings.updateLogo}
                    size="sm"
                    color="primary"
                  >
                    انتخاب تصویر
                    <Input
                      type="file"
                      onChange={handleUploadImage}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </div>
              </div>
            </div>
            {/* form fields */}
            <Row>
              {/* name */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="name">
                  نام دسته بندی
                </Label>
                <Input
                  // disabled={loadings.submit}
                  value={createCategoryController.values.name}
                  onChange={createCategoryController.handleChange}
                  autoFocus={true}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="نام دسته بندی را وارد کنید"
                  invalid={
                    createCategoryController.touched.name
                      ? createCategoryController.errors.name
                      : null
                  }
                />
                {createCategoryController.touched.name &&
                createCategoryController.errors.name ? (
                  <FormFeedback>
                    {createCategoryController.errors.name}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* parentId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="parentId">
                  دسته بندی والد
                </Label>
                <AsyncPaginate
                  value={createCategoryController.values.parentId}
                  loadOptions={getSelectCategories}
                  onChange={(value) =>
                    createCategoryController.setFieldValue("parentId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="parentId"
                  name="parentId"
                />
              </Col>
              {/* active */}
              <Col
                xs="12"
                sm="6"
                md="4"
                className="mb-1 d-flex flex-column justify-content-center"
              >
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={
                        createCategoryController.values.active === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          createCategoryController.setFieldValue(
                            "active",
                            true
                          );
                        } else {
                          createCategoryController.setFieldValue(
                            "active",
                            false
                          );
                        }
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      دسته بندی فعال باشد
                    </Label>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createCategory}
              type="submit"
              color="primary"
              style={{ minWidth: 150 }}
            >
              ثبت
            </CustomButton>
          </CardFooter>
        </Card>
      </Form>
    </Fragment>
  );
};
export default CreateCategory;

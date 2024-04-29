import { Fragment, useEffect } from "react";
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
  Collapse,
} from "reactstrap";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import usePermission from "../../../hooks/use_permission";

const UpdatePermission = () => {
  const {
    getRoles,
    getActionPermissions,
    updatePermissionController,
    roleData,
    actionPermissions,
    setActionPermissions,
    loadings,
    getRolesLoading,
  } = usePermission();

  useEffect(() => {
    getRoles();
    getActionPermissions();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش دسترسی کاربر"
        data={[{ title: "داشبورد" }, { title: "ویرایش دسترسی کاربر" }]}
      />
      <Form onSubmit={updatePermissionController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ویرایش دسترسی کاربر</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* roleId */}
              <Col xs="12" sm="6" md="4" className="mb-1">
                <Label className="form-label" for="roleId">
                  نقش کاربر
                </Label>
                <Select
                  value={updatePermissionController.values.roleId}
                  onChange={(value) => {
                    updatePermissionController.setFieldValue("roleId", value);
                  }}
                  isLoading={getRolesLoading}
                  noOptionsMessage={() => " نقش کاربری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getRolesLoading}
                  placeholder="نقش کاربر را انتخاب کنید"
                  options={roleData}
                  className={`react-select ${
                    updatePermissionController.touched.roleId &&
                    updatePermissionController.errors.roleId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="roleId"
                  name="roleId"
                />
                {updatePermissionController.touched.roleId &&
                updatePermissionController.errors.roleId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نقش کاربر اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* permissionDatas */}
              <Row>
                {actionPermissions.map((item, index) => (
                  <Col key={index} xs="12" sm="6">
                    <Card className="mb-0">
                      {/* card title */}
                      <CardHeader
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let array = [...actionPermissions];
                          let selectedItem = array.find(
                            (o) => o.label == item.label
                          );
                          selectedItem.open = !selectedItem.open;
                          array.find((intem) => {
                            if (intem.label == selectedItem.label) {
                              intem = selectedItem;
                            }
                          });
                          setActionPermissions(array);
                        }}
                        className="border-bottom"
                      >
                        <CardTitle style={{ fontSize: 16 }}>
                          {item.label}
                        </CardTitle>
                        <div
                          style={
                            item.open
                              ? {
                                  transform: "rotate(-180deg)",
                                  transition: "all .2s",
                                }
                              : { transition: "all .2s" }
                          }
                        >
                          <IoIosArrowDown />
                        </div>
                      </CardHeader>
                      {/* card body */}
                      <Collapse isOpen={item.open}>
                        <CardBody className="pb-0">
                          {item.value.map((val, i) => (
                            <Col className="mb-1" key={i}>
                              <div className="form-switch p-0 m-0">
                                <div className="d-flex">
                                  <Input
                                    type="switch"
                                    id="rtl"
                                    className="m-0 p-0"
                                    name="RTL"
                                    checked={
                                      updatePermissionController.values.permissionDatas.find(
                                        (intem) => intem === val
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      let array = [
                                        ...updatePermissionController.values
                                          .permissionDatas,
                                      ];
                                      console.log(array, val);
                                      if (e.target.checked === false) {
                                        array = array.filter(
                                          (vall) => val !== vall
                                        );
                                      } else {
                                        array.push(val);
                                      }
                                      updatePermissionController.setFieldValue(
                                        "permissionDatas",
                                        array
                                      );
                                    }}
                                  />
                                  <Label
                                    style={{ paddingTop: 2, marginRight: 8 }}
                                    check
                                  >
                                    {val}
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </CardBody>
                      </Collapse>
                    </Card>
                  </Col>
                ))}
              </Row>
              {/* isActive */}
              <Col xs="12" className="mt-2">
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={updatePermissionController.values.isActive}
                      onChange={(e) => {
                        updatePermissionController.setFieldValue(
                          "isActive",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      دسترسی فعال باشد
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
              loading={loadings.updatePermission}
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
export default UpdatePermission;

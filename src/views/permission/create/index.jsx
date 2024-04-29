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

const CreatePermission = () => {
  const {
    getRoles,
    getActionPermissions,
    createPermissionController,
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
        title="ایجاد دسترسی کاربر جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد دسترسی کاربر جدید" }]}
      />
      <Form onSubmit={createPermissionController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد دسترسی کاربر جدید</CardTitle>
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
                  value={createPermissionController.values.roleId}
                  onChange={(value) => {
                    createPermissionController.setFieldValue("roleId", value);
                  }}
                  isLoading={getRolesLoading}
                  noOptionsMessage={() => " نقش کاربری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getRolesLoading}
                  placeholder="نقش کاربر را انتخاب کنید"
                  options={roleData}
                  className={`react-select ${
                    createPermissionController.touched.roleId &&
                    createPermissionController.errors.roleId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="roleId"
                  name="roleId"
                />
                {createPermissionController.touched.roleId &&
                createPermissionController.errors.roleId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نقش کاربر اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* permissionDatas */}
              <Row>
                {actionPermissions.map((item, index) => (
                  <Col key={index} xs="12" sm="6" md="4">
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
                                <div className="d-flex align-items-center justify-content-between">
                                  <Label
                                    style={{ paddingTop: 2, marginLeft: 8 }}
                                    check
                                  >
                                    {val.translateName}
                                  </Label>
                                  <Input
                                    type="switch"
                                    id="rtl"
                                    className="m-0 p-0"
                                    name="RTL"
                                    checked={
                                      createPermissionController.values.permissionDatas.find(
                                        (intem) =>
                                          intem.actionName === val.actionName
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      let array = [
                                        ...createPermissionController.values
                                          .permissionDatas,
                                      ];
                                      if (e.target.checked === false) {
                                        array = array.filter(
                                          (vall) =>
                                            val.actionName !== vall.actionName
                                        );
                                      } else {
                                        array.push({
                                          ...val,
                                          entityName: item.label,
                                        });
                                      }
                                      createPermissionController.setFieldValue(
                                        "permissionDatas",
                                        array
                                      );
                                    }}
                                  />
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
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createPermission}
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
export default CreatePermission;

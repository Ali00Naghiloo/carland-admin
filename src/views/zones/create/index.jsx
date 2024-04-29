import { Fragment, useEffect, useState } from "react";
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
} from "reactstrap";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useZones from "../../../hooks/use_zones";
import formatHelper from "../../../helper/format_helper";
import toast from "react-hot-toast";

const CreateZone = () => {
  const {
    getRoles,
    getAgents,
    createZoneController,
    roleData,
    loadings,
    getRolesLoading,
  } = useZones();

  const [zipValue, setZipValue] = useState("");
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (zipValue.length === 3 && isAuto) {
      let array = [...createZoneController.values.zipCode];
      if (array.find((code) => code === zipValue)) {
        toast.error("کد پستی قبلا در لیست اضافه شده است.");
      } else {
        array.push(zipValue);
        createZoneController.setFieldValue("zipCode", array);
        setZipValue("");
      }
    }
  }, [zipValue]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد منطقه تحت پوشش جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد منطقه تحت پوشش جدید" }]}
      />
      <Form onSubmit={createZoneController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد منطقه تحت پوشش جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* roleId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="roleId">
                  انتخاب نقش
                </Label>
                <Select
                  value={createZoneController.values.roleId}
                  options={roleData}
                  onChange={(value) => {
                    createZoneController.setFieldValue("roleId", value);
                    createZoneController.setFieldValue("userAgentId", null);
                  }}
                  isDisabled={getRolesLoading}
                  isLoading={getRolesLoading}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="نقش را انتخاب کنید"
                  className={`react-select ${
                    createZoneController.touched.roleId &&
                    createZoneController.errors.roleId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="roleId"
                  name="roleId"
                />
                {createZoneController.touched.roleId &&
                createZoneController.errors.roleId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نقش اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* userAgentId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="userAgentId">
                  نماینده
                </Label>
                <AsyncPaginate
                  value={createZoneController.values.userAgentId}
                  loadOptions={getAgents}
                  onChange={(value) => {
                    createZoneController.setFieldValue("userAgentId", value);
                  }}
                  additional={{
                    page: 1,
                  }}
                  isDisabled={!createZoneController.values.roleId}
                  cacheUniqs={[createZoneController.values.roleId]}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="نماینده را انتخاب کنید"
                  className={`react-select ${
                    createZoneController.touched.userAgentId &&
                    createZoneController.errors.userAgentId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="userAgentId"
                  name="userAgentId"
                />
                {createZoneController.touched.userAgentId &&
                createZoneController.errors.userAgentId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نماینده اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* active */}
              <Col
                xs="12"
                sm="6"
                md="3"
                className="mb-1 d-flex align-items-center"
              >
                <div className="form-switch p-0 m-0">
                  <div className="d-flex">
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      checked={createZoneController.values.active}
                      onChange={(e) => {
                        createZoneController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      منطقه فعال باشد
                    </Label>
                  </div>
                </div>
              </Col>
              {/* zipCode */}
              <Col xs="12" className="mb-1">
                <Label
                  className="form-label d-flex align-items-center justify-content-between mb-1"
                  for="number"
                >
                  <span>سه رقم اول کد پستی</span>
                  <div className="form-switch p-0 m-0">
                    <div className="d-flex align-items-center">
                      <Label
                        style={{ paddingTop: 3, paddingLeft: 8 }}
                        htmlFor="isAuto"
                      >
                        افزودن خودکار
                      </Label>
                      <Input
                        type="switch"
                        id="isAuto"
                        className="m-0 p-0"
                        name="isAuto"
                        checked={isAuto}
                        onChange={() => setIsAuto(!isAuto)}
                      />
                    </div>
                  </div>
                </Label>
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                  <Input
                    value={zipValue}
                    onChange={(e) => setZipValue(e.target.value)}
                    type="number"
                    id="zipValue"
                    name="zipValue"
                    placeholder="سه رقم اول کد پستی"
                  />
                  <CustomButton
                    onClick={() => {
                      if (zipValue.length !== 3) {
                        toast.error("لطفا ۳ رقم کدپستی را وارد کنید");
                      } else {
                        let array = [...createZoneController.values.zipCode];
                        if (array.find((code) => code === zipValue)) {
                          toast.error("کد پستی قبلا در لیست اضافه شده است.");
                        } else {
                          array.push(zipValue);
                          createZoneController.setFieldValue("zipCode", array);
                          setZipValue("");
                        }
                      }
                    }}
                    className="d-sm-block"
                    color="primary"
                  >
                    +
                  </CustomButton>
                </div>
              </Col>
              {/* added numbers list */}
              <Col xs="12">
                {createZoneController.values.zipCode.map((item, index) => (
                  <div
                    key={index}
                    style={
                      index !== createZoneController.values.zipCode.length - 1
                        ? {
                            borderBottom: "1px solid rgb(160,160,160)",
                            padding: "12px 5px",
                          }
                        : { border: "none", padding: "12px 5px" }
                    }
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="mr-2">
                      {formatHelper.toPersianString(index + 1)} -{" "}
                      {formatHelper.toPersianString(item)}
                    </div>
                    <div
                      style={{ cursor: "pointer", fontSize: 18 }}
                      onClick={() => {
                        createZoneController.setFieldValue(
                          "zipCode",
                          createZoneController.values.zipCode.filter(
                            (it, i) => i !== index
                          )
                        );
                      }}
                    >
                      x
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createZone}
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
export default CreateZone;

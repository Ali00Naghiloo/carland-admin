import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useModemPackage from "../../../hooks/use_modem_package";
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
  Badge,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import {
  TYPE_INTERNET_DATA,
  PACKET_TIME_DATA,
} from "../../../utility/data/modem_package";
import { formatBytes } from "../../../helper/format_unit";
import CustomButton from "../../../components/button";
import formatHelper from "../../../helper/format_helper";

const CreateModemPackage = () => {
  const {
    getOperators,
    createModemPackageController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useModemPackage();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد بسته مودم جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد بسته مودم جدید" }]}
      />
      <Form onSubmit={createModemPackageController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد بسته مودم جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* namepacket */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="namepacket">
                  نام بسته
                </Label>
                <Input
                  value={createModemPackageController.values.namepacket}
                  onChange={createModemPackageController.handleChange}
                  type="text"
                  id="namepacket"
                  name="namepacket"
                  placeholder="نام بسته را وارد کنید"
                  invalid={
                    createModemPackageController.touched.namepacket
                      ? createModemPackageController.errors.namepacket
                      : null
                  }
                />
                {createModemPackageController.touched.namepacket &&
                createModemPackageController.errors.namepacket ? (
                  <FormFeedback>
                    {createModemPackageController.errors.namepacket}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* operatorId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="operatorId">
                  اپراتور
                </Label>
                <Select
                  value={createModemPackageController.values.operatorId}
                  onChange={(value) =>
                    createModemPackageController.setFieldValue(
                      "operatorId",
                      value
                    )
                  }
                  isLoading={getOperatorsLoading}
                  noOptionsMessage={() => " اپراتوری یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  isDisabled={getOperatorsLoading}
                  placeholder="اپراتور را انتخاب کنید"
                  options={operatorsList}
                  className={`react-select ${
                    createModemPackageController.touched.operatorId &&
                    createModemPackageController.errors.operatorId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="operatorId"
                  name="operatorId"
                />
                {createModemPackageController.touched.operatorId &&
                createModemPackageController.errors.operatorId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد اپراتور اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* typeInternet */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="typeInternet">
                  نوع بسته
                </Label>
                <Select
                  value={createModemPackageController.values.typeInternet}
                  onChange={(value) =>
                    createModemPackageController.setFieldValue(
                      "typeInternet",
                      value
                    )
                  }
                  noOptionsMessage={() => " نوع بسته ای یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  placeholder="نوع بسته را انتخاب کنید"
                  options={TYPE_INTERNET_DATA}
                  className={`react-select ${
                    createModemPackageController.touched.typeInternet &&
                    createModemPackageController.errors.typeInternet
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="typeInternet"
                  name="typeInternet"
                />
                {createModemPackageController.touched.typeInternet &&
                createModemPackageController.errors.typeInternet ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد نوع بسته اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* price */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="price">
                  قیمت بسته (تومان)
                </Label>
                <Input
                  value={createModemPackageController.values.price}
                  onChange={createModemPackageController.handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="قیمت بسته را به تومان وارد کنید"
                  invalid={
                    createModemPackageController.touched.price
                      ? createModemPackageController.errors.price
                      : null
                  }
                />
                {createModemPackageController.touched.price &&
                createModemPackageController.errors.price ? (
                  <FormFeedback>
                    {createModemPackageController.errors.price}
                  </FormFeedback>
                ) : null}
              </Col>
              {/* packetTime */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="packetTime">
                  مدت زمان بسته
                </Label>
                <Select
                  value={createModemPackageController.values.packetTime}
                  onChange={(value) =>
                    createModemPackageController.setFieldValue(
                      "packetTime",
                      value
                    )
                  }
                  noOptionsMessage={() => " مدت زمان بسته ای یافت نشد."}
                  theme={selectThemeColors}
                  closeMenuOnSelect={true}
                  placeholder="مدت زمان بسته را انتخاب کنید"
                  options={PACKET_TIME_DATA}
                  className={`react-select ${
                    createModemPackageController.touched.packetTime &&
                    createModemPackageController.errors.packetTime
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="packetTime"
                  name="packetTime"
                />
                {createModemPackageController.touched.packetTime &&
                createModemPackageController.errors.packetTime ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد مدت زمان بسته اجباری است.
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
                      checked={createModemPackageController.values.active}
                      onChange={(e) => {
                        createModemPackageController.setFieldValue(
                          "active",
                          e.target.checked
                        );
                      }}
                    />
                    <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                      بسته مودم فعال باشد
                    </Label>
                  </div>
                </div>
              </Col>
              {/* packetvolume */}
              <Col xs="12" className="mb-1">
                <Label htmlFor="packetvolume">حجم بسته</Label>
                <Input
                  title={formatBytes(
                    createModemPackageController.values.packetvolume
                  )}
                  min={50000000}
                  max={50000000000}
                  step={10000000}
                  value={createModemPackageController.values.packetvolume}
                  onChange={createModemPackageController.handleChange}
                  type="range"
                  name="packetvolume"
                  id="packetvolume"
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div>۵۰ مگابایت</div>
                  <Badge pill color="primary">
                    {formatHelper.toPersianString(
                      formatBytes(
                        createModemPackageController.values.packetvolume
                      )
                    )}
                  </Badge>
                  <div>۵۰ گیگابایت</div>
                </div>
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createModemPackage}
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
export default CreateModemPackage;

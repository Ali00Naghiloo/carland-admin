import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useModemPackage from "../../../hooks/use_modem_package";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import CustomLoading from "../../../components/loading";

const UpdateModemPackage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getModemPackageById,
    getOperators,
    updateModemPackageController,
    viewModemPackageData,
    operatorsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useModemPackage();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getModemPackageById(entity_id);
      getOperators();
      updateModemPackageController.setFieldValue("id", entity_id);
    } else {
      navigate("/modem_package/all");
    }
  }, []);

  useEffect(() => {
    if (viewModemPackageData) {
      updateModemPackageController.setFieldValue(
        "namepacket",
        viewModemPackageData?.namepacket
      );
      updateModemPackageController.setFieldValue("operatorId", {
        label: viewModemPackageData?.operator.name,
        value: viewModemPackageData?.operator.id,
      });
      updateModemPackageController.setFieldValue(
        "price",
        viewModemPackageData?.price
      );
      updateModemPackageController.setFieldValue(
        "active",
        viewModemPackageData?.active
      );
      updateModemPackageController.setFieldValue(
        "packetvolume",
        viewModemPackageData?.packetvolume
      );
      const selectedTypeInternet = TYPE_INTERNET_DATA.find(
        (o) => o.value == viewModemPackageData?.typeInternet
      );
      updateModemPackageController.setFieldValue(
        "typeInternet",
        selectedTypeInternet
      );
      const selectedPacketTime = PACKET_TIME_DATA.find(
        (o) => o.value == viewModemPackageData?.packetTime
      );
      updateModemPackageController.setFieldValue(
        "packetTime",
        selectedPacketTime
      );
    }
  }, [viewModemPackageData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش بسته مودم"
        data={[{ title: "داشبورد" }, { title: "ویرایش بسته مودم" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateModemPackageController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ایجاد ویرایش بسته مودم</CardTitle>
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
                    value={updateModemPackageController.values.namepacket}
                    onChange={updateModemPackageController.handleChange}
                    type="text"
                    id="namepacket"
                    name="namepacket"
                    placeholder="نام بسته را وارد کنید"
                    invalid={
                      updateModemPackageController.touched.namepacket
                        ? updateModemPackageController.errors.namepacket
                        : null
                    }
                  />
                  {updateModemPackageController.touched.namepacket &&
                  updateModemPackageController.errors.namepacket ? (
                    <FormFeedback>
                      {updateModemPackageController.errors.namepacket}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* operatorId */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateModemPackageController.values.operatorId}
                    onChange={(value) =>
                      updateModemPackageController.setFieldValue(
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
                      updateModemPackageController.touched.operatorId &&
                      updateModemPackageController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateModemPackageController.touched.operatorId &&
                  updateModemPackageController.errors.operatorId ? (
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
                    value={updateModemPackageController.values.typeInternet}
                    onChange={(value) =>
                      updateModemPackageController.setFieldValue(
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
                      updateModemPackageController.touched.typeInternet &&
                      updateModemPackageController.errors.typeInternet
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="typeInternet"
                    name="typeInternet"
                  />
                  {updateModemPackageController.touched.typeInternet &&
                  updateModemPackageController.errors.typeInternet ? (
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
                    value={updateModemPackageController.values.price}
                    onChange={updateModemPackageController.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="قیمت بسته را به تومان وارد کنید"
                    invalid={
                      updateModemPackageController.touched.price
                        ? updateModemPackageController.errors.price
                        : null
                    }
                  />
                  {updateModemPackageController.touched.price &&
                  updateModemPackageController.errors.price ? (
                    <FormFeedback>
                      {updateModemPackageController.errors.price}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* packetTime */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="packetTime">
                    مدت زمان بسته
                  </Label>
                  <Select
                    value={updateModemPackageController.values.packetTime}
                    onChange={(value) =>
                      updateModemPackageController.setFieldValue(
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
                      updateModemPackageController.touched.packetTime &&
                      updateModemPackageController.errors.packetTime
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="packetTime"
                    name="packetTime"
                  />
                  {updateModemPackageController.touched.packetTime &&
                  updateModemPackageController.errors.packetTime ? (
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
                        checked={updateModemPackageController.values.active}
                        onChange={(e) => {
                          updateModemPackageController.setFieldValue(
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
                      updateModemPackageController.values.packetvolume
                    )}
                    min={50000000}
                    max={50000000000}
                    step={10000000}
                    value={updateModemPackageController.values.packetvolume}
                    onChange={updateModemPackageController.handleChange}
                    type="range"
                    name="packetvolume"
                    id="packetvolume"
                  />
                  <div className="d-flex align-items-center justify-content-between">
                    <div>۵۰ مگابایت</div>
                    <Badge pill color="primary">
                      {formatHelper.toPersianString(
                        formatBytes(
                          updateModemPackageController.values.packetvolume
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
                loading={loadings.updateModemPackage}
                type="submit"
                color="primary"
                style={{ minWidth: 150 }}
              >
                ثبت
              </CustomButton>
            </CardFooter>
          </Card>
        </Form>
      ) : null}
    </Fragment>
  );
};
export default UpdateModemPackage;

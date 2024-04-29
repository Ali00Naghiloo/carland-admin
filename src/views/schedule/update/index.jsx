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
} from "reactstrap";
import Select from "react-select";
import { useSearchParams, useNavigate } from "react-router-dom";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import CustomLoading from "../../../components/loading";
import useSchedule from "../../../hooks/use_schedule";
import { TimeData } from "../../../utility/data/times";
import { MonthData } from "../../../utility/data/month";

const UpdateSchedule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getScheduleById,
    viewScheduleData,
    updateScheduleController,
    loadings,
    getByIdLoading,
  } = useSchedule();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getScheduleById(entity_id);
      updateScheduleController.setFieldValue("id", entity_id);
    } else {
      navigate("/schedule/all");
    }
  }, []);

  useEffect(() => {
    if (viewScheduleData) {
      // monthnumber
      if (viewScheduleData?.monthnumber) {
        updateScheduleController.setFieldValue(
          "monthnumber",
          MonthData.find((item) => item.value == viewScheduleData?.monthnumber)
        );
      }
      // satrtTime
      if (viewScheduleData?.satrtTime) {
        updateScheduleController.setFieldValue(
          "satrtTime",
          TimeData.find((item) => item.value == viewScheduleData?.satrtTime)
        );
      }
      // endTime
      if (viewScheduleData?.endTime) {
        updateScheduleController.setFieldValue(
          "endTime",
          TimeData.find((item) => item.value == viewScheduleData?.endTime)
        );
      }
      // description
      if (viewScheduleData?.description) {
        updateScheduleController.setFieldValue(
          "description",
          viewScheduleData?.description
        );
      }
      // isActive
      updateScheduleController.setFieldValue(
        "isActive",
        viewScheduleData?.isActive
      );
    }
  }, [viewScheduleData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش زمانبندی خدمات"
        data={[{ title: "داشبورد" }, { title: "ویرایش زمانبندی خدمات" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateScheduleController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش زمانبندی خدمات</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* monthnumber */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="monthnumber">
                    ماه
                  </Label>
                  <Select
                    value={updateScheduleController.values.monthnumber}
                    onChange={(value) =>
                      updateScheduleController.setFieldValue(
                        "monthnumber",
                        value
                      )
                    }
                    options={MonthData}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="انتخاب کنید"
                    className={`react-select ${
                      updateScheduleController.touched.monthnumber &&
                      updateScheduleController.errors.monthnumber
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="monthnumber"
                    name="monthnumber"
                  />
                  {updateScheduleController.touched.monthnumber &&
                  updateScheduleController.errors.monthnumber ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد ماه اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* satrtTime */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="satrtTime">
                    زمان شروع
                  </Label>
                  <Select
                    value={updateScheduleController.values.satrtTime}
                    onChange={(value) =>
                      updateScheduleController.setFieldValue("satrtTime", value)
                    }
                    options={TimeData}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="انتخاب کنید"
                    className={`react-select ${
                      updateScheduleController.touched.satrtTime &&
                      updateScheduleController.errors.satrtTime
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="satrtTime"
                    name="satrtTime"
                  />
                  {updateScheduleController.touched.satrtTime &&
                  updateScheduleController.errors.satrtTime ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد زمان شروع اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* endTime */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="endTime">
                    زمان پایان
                  </Label>
                  <Select
                    value={updateScheduleController.values.endTime}
                    onChange={(value) =>
                      updateScheduleController.setFieldValue("endTime", value)
                    }
                    options={TimeData}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="انتخاب کنید"
                    className={`react-select ${
                      updateScheduleController.touched.endTime &&
                      updateScheduleController.errors.endTime
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="endTime"
                    name="endTime"
                  />
                  {updateScheduleController.touched.endTime &&
                  updateScheduleController.errors.endTime ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد زمان پایان اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* isActive */}
                <Col xs="12" className="mb-2 mt-1">
                  <div className="form-switch p-0 m-0">
                    <div className="d-flex">
                      <Input
                        type="switch"
                        id="rtl"
                        className="m-0 p-0"
                        name="RTL"
                        checked={
                          updateScheduleController.values.isActive === true
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          updateScheduleController.setFieldValue(
                            "isActive",
                            e.target.checked
                          );
                        }}
                      />
                      <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                        زمانبندی فعال باشد
                      </Label>
                    </div>
                  </div>
                </Col>
                {/* description */}
                <Col xs="12" className="mb-1">
                  <Label className="form-label" for="description">
                    توضیحات
                  </Label>
                  <Input
                    value={updateScheduleController.values.description}
                    onChange={updateScheduleController.handleChange}
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="توضیحات را وارد کنید"
                    invalid={
                      updateScheduleController.touched.description
                        ? updateScheduleController.errors.description
                        : null
                    }
                  />
                  {updateScheduleController.touched.description &&
                  updateScheduleController.errors.description ? (
                    <FormFeedback>
                      {updateScheduleController.errors.description}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateSchedule}
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
export default UpdateSchedule;

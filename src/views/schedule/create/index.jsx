import { Fragment } from "react";
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
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useSchedule from "../../../hooks/use_schedule";
import { TimeData } from "../../../utility/data/times";
import { MonthData } from "../../../utility/data/month";

const CreateSchedule = () => {
  const { createScheduleController, loadings } = useSchedule();

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ایجاد زمانبندی خدمات جدید"
        data={[{ title: "داشبورد" }, { title: "ایجاد زمانبندی خدمات جدید" }]}
      />
      <Form onSubmit={createScheduleController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد زمانبندی خدمات جدید</CardTitle>
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
                  value={createScheduleController.values.monthnumber}
                  onChange={(value) =>
                    createScheduleController.setFieldValue("monthnumber", value)
                  }
                  options={MonthData}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createScheduleController.touched.monthnumber &&
                    createScheduleController.errors.monthnumber
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="monthnumber"
                  name="monthnumber"
                />
                {createScheduleController.touched.monthnumber &&
                createScheduleController.errors.monthnumber ? (
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
                  value={createScheduleController.values.satrtTime}
                  onChange={(value) =>
                    createScheduleController.setFieldValue("satrtTime", value)
                  }
                  options={TimeData}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createScheduleController.touched.satrtTime &&
                    createScheduleController.errors.satrtTime
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="satrtTime"
                  name="satrtTime"
                />
                {createScheduleController.touched.satrtTime &&
                createScheduleController.errors.satrtTime ? (
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
                  value={createScheduleController.values.endTime}
                  onChange={(value) =>
                    createScheduleController.setFieldValue("endTime", value)
                  }
                  options={TimeData}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="انتخاب کنید"
                  className={`react-select ${
                    createScheduleController.touched.endTime &&
                    createScheduleController.errors.endTime
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="endTime"
                  name="endTime"
                />
                {createScheduleController.touched.endTime &&
                createScheduleController.errors.endTime ? (
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
                        createScheduleController.values.isActive === true
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        createScheduleController.setFieldValue(
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
                  value={createScheduleController.values.description}
                  onChange={createScheduleController.handleChange}
                  type="textarea"
                  id="description"
                  name="description"
                  placeholder="توضیحات را وارد کنید"
                  invalid={
                    createScheduleController.touched.description
                      ? createScheduleController.errors.description
                      : null
                  }
                />
                {createScheduleController.touched.description &&
                createScheduleController.errors.description ? (
                  <FormFeedback>
                    {createScheduleController.errors.description}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.createSchedule}
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
export default CreateSchedule;

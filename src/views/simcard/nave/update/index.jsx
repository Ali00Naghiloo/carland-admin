import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useSimcardNave from "../../../../hooks/use_simcard_nave";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomLoading from "../../../../components/loading";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";

const UpdateSimcardNave = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    getSimcardNaveById,
    getOperators,
    updateSimcardNaveController,
    viewSimcardNaveData,
    operatorsList,
    loadings,
    getByIdLoading,
    getOperatorsLoading,
  } = useSimcardNave();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getSimcardNaveById(entity_id);
      getOperators();
      updateSimcardNaveController.setFieldValue("id", entity_id);
    } else {
      navigate("/simcard/nave/all");
    }
  }, []);

  useEffect(() => {
    if (viewSimcardNaveData) {
      updateSimcardNaveController.setFieldValue(
        "serial",
        viewSimcardNaveData?.serial
      );
      updateSimcardNaveController.setFieldValue("operatorId", {
        label: viewSimcardNaveData?.operator.name,
        value: viewSimcardNaveData?.operator.id,
      });
      updateSimcardNaveController.setFieldValue(
        "price",
        viewSimcardNaveData?.price
      );
    }
  }, [viewSimcardNaveData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش سیمکارت خام"
        data={[{ title: "داشبورد" }, { title: "ویرایش سیمکارت خام" }]}
      />
      {/* loading */}
      {getByIdLoading ? <CustomLoading /> : null}
      {/* form */}
      {!getByIdLoading ? (
        <Form onSubmit={updateSimcardNaveController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش سیمکارت خام</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* operatorId */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="operatorId">
                    اپراتور
                  </Label>
                  <Select
                    value={updateSimcardNaveController.values.operatorId}
                    onChange={(value) =>
                      updateSimcardNaveController.setFieldValue(
                        "operatorId",
                        value
                      )
                    }
                    options={operatorsList}
                    isDisabled={getOperatorsLoading}
                    isLoading={getOperatorsLoading}
                    closeMenuOnSelect={true}
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="انتخاب کنید"
                    className={`react-select ${
                      updateSimcardNaveController.touched.operatorId &&
                      updateSimcardNaveController.errors.operatorId
                        ? "form_error"
                        : ""
                    }`}
                    classNamePrefix="select"
                    id="operatorId"
                    name="operatorId"
                  />
                  {updateSimcardNaveController.touched.operatorId &&
                  updateSimcardNaveController.errors.operatorId ? (
                    <FormFeedback style={{ display: "block" }}>
                      فیلد اپراتور اجباری است.
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* serial */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="serial">
                    سریال سیمکارت
                  </Label>
                  <Input
                    value={updateSimcardNaveController.values.serial}
                    onChange={updateSimcardNaveController.handleChange}
                    type="text"
                    id="serial"
                    name="serial"
                    placeholder="سریال سیمکارت را وارد کنید"
                    invalid={
                      updateSimcardNaveController.touched.serial
                        ? updateSimcardNaveController.errors.serial
                        : null
                    }
                  />
                  {updateSimcardNaveController.touched.serial &&
                  updateSimcardNaveController.errors.serial ? (
                    <FormFeedback>
                      {updateSimcardNaveController.errors.serial}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* price */}
                <Col xs="12" sm="6" md="4" className="mb-1">
                  <Label className="form-label" for="price">
                    قیمت
                  </Label>
                  <Input
                    value={updateSimcardNaveController.values.price}
                    onChange={updateSimcardNaveController.handleChange}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="قیمت را وارد کنید"
                    invalid={
                      updateSimcardNaveController.touched.price
                        ? updateSimcardNaveController.errors.price
                        : null
                    }
                  />
                  {updateSimcardNaveController.touched.price &&
                  updateSimcardNaveController.errors.price ? (
                    <FormFeedback>
                      {updateSimcardNaveController.errors.price}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateSimcardNave}
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
export default UpdateSimcardNave;

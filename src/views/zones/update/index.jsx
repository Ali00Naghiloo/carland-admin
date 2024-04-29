import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import { useSearchParams, useNavigate } from "react-router-dom";
import useZones from "../../../hooks/use_zones";
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
import CustomButton from "../../../components/button";
import CustomLoading from "../../../components/loading";

const UpdateZone = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    getZoneById,
    viewZoneData,
    getRoles,
    getUpdateAgents,
    updateZoneController,
    roleData,
    loadings,
    getByIdLoading,
    getRolesLoading,
  } = useZones();

  useEffect(() => {
    let entity_id = searchParams.get("entity_id");
    if (entity_id) {
      getZoneById(entity_id);
      getRoles();
      updateZoneController.setFieldValue("id", entity_id);
    } else {
      navigate("/zones/all");
    }
  }, []);

  useEffect(() => {
    if (viewZoneData) {
      // name
      if (viewZoneData?.zipCode) {
        updateZoneController.setFieldValue("zipCode", viewZoneData?.zipCode);
      }
      if (viewZoneData.userAgentId) {
        updateZoneController.setFieldValue(
          "userAgentId",
          viewZoneData?.userAgentId
        );
      }
      // active
      updateZoneController.setFieldValue("isActive", viewZoneData?.isActive);
    }
  }, [viewZoneData]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش منطقه تحت پوشش"
        data={[{ title: "داشبورد" }, { title: "ویرایش منطقه تحت پوشش" }]}
      />
      {getByIdLoading ? <CustomLoading /> : null}
      {!getByIdLoading ? (
        <Form onSubmit={updateZoneController.handleSubmit}>
          <Card className="w-100 card">
            {/* card header */}
            <CardHeader className="border-bottom">
              <CardTitle>فرم ویرایش منطقه تحت پوشش</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              {/* form fields */}
              <Row>
                {/* zipCode */}
                <Col xs="12" sm="6" md="3" className="mb-1">
                  <Label className="form-label" for="zipCode">
                    سه رقم کدپستی
                  </Label>
                  <Input
                    value={updateZoneController.values.zipCode}
                    onChange={updateZoneController.handleChange}
                    autoFocus={true}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="سه رقم کدپستی را وارد کنید"
                    invalid={
                      updateZoneController.touched.zipCode
                        ? updateZoneController.errors.zipCode
                        : null
                    }
                  />
                  {updateZoneController.touched.zipCode &&
                  updateZoneController.errors.zipCode ? (
                    <FormFeedback>
                      {updateZoneController.errors.zipCode}
                    </FormFeedback>
                  ) : null}
                </Col>
                {/* isActive */}
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
                        checked={updateZoneController.values.isActive}
                        onChange={(e) => {
                          updateZoneController.setFieldValue(
                            "isActive",
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
              </Row>
            </CardBody>
            {/* card footer */}
            <CardFooter className="border-top d-flex justify-content-center">
              {/* submit button */}
              <CustomButton
                loading={loadings.updateZone}
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
export default UpdateZone;

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
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../components/button";
import useOffer from "../../../hooks/use_offer";

const AssignOffer = () => {
  const {
    getSelectOffers,
    getSelectProduct,
    getSelectService,
    getOperators,
    assignOfferController,
    operatorsList,
    loadings,
    getOperatorsLoading,
  } = useOffer();

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="تخصیص تخفیف"
        data={[{ title: "داشبورد" }, { title: "تخصیص تخفیف" }]}
      />
      <Form onSubmit={assignOfferController.handleSubmit}>
        <Card className="w-100 card">
          {/* card header */}
          <CardHeader className="border-bottom">
            <CardTitle>فرم ایجاد کمیسیون جدید</CardTitle>
          </CardHeader>
          <CardBody className="pt-2">
            {/* form fields */}
            <Row>
              {/* offerId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="offerId">
                  تخفیف
                </Label>
                <AsyncPaginate
                  value={assignOfferController.values.offerId}
                  loadOptions={getSelectOffers}
                  onChange={(value) =>
                    assignOfferController.setFieldValue("offerId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="تخفیف را انتخاب کنید"
                  className={`react-select ${
                    assignOfferController.touched.offerId &&
                    assignOfferController.errors.offerId
                      ? "form_error"
                      : ""
                  }`}
                  classNamePrefix="select"
                  id="offerId"
                  name="offerId"
                />
                {assignOfferController.touched.offerId &&
                assignOfferController.errors.offerId ? (
                  <FormFeedback style={{ display: "block" }}>
                    فیلد تخفیف اجباری است.
                  </FormFeedback>
                ) : null}
              </Col>
              {/* OperatorId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="OperatorId">
                  اپراتور
                </Label>
                <Select
                  value={assignOfferController.values.OperatorId}
                  options={operatorsList}
                  onChange={(value) => {
                    assignOfferController.setFieldValue("OperatorId", value);
                    assignOfferController.setFieldValue("productId", null);
                    assignOfferController.setFieldValue("serviceId", null);
                  }}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={true}
                  placeholder="اپراتور را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="OperatorId"
                  name="OperatorId"
                />
              </Col>
              {/* productId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="productId">
                  محصول
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={assignOfferController.values.productId}
                  loadOptions={getSelectProduct}
                  onChange={(value) =>
                    assignOfferController.setFieldValue("productId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  isDisabled={!assignOfferController.values.OperatorId}
                  cacheUniqs={[assignOfferController.values.OperatorId]}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="محصول را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="productId"
                  name="productId"
                />
              </Col>
              {/* serviceId */}
              <Col xs="12" sm="6" md="3" className="mb-1">
                <Label className="form-label" for="serviceId">
                  خدمت
                </Label>
                <AsyncPaginate
                  isMulti={true}
                  value={assignOfferController.values.serviceId}
                  loadOptions={getSelectService}
                  onChange={(value) =>
                    assignOfferController.setFieldValue("serviceId", value)
                  }
                  additional={{
                    page: 1,
                  }}
                  isDisabled={!assignOfferController.values.OperatorId}
                  cacheUniqs={[assignOfferController.values.OperatorId]}
                  loadingMessage={() => "در حال بارگذاری . . ."}
                  closeMenuOnSelect={true}
                  theme={selectThemeColors}
                  isClearable={false}
                  placeholder="خدمت را انتخاب کنید"
                  className={"react-select"}
                  classNamePrefix="select"
                  id="serviceId"
                  name="serviceId"
                />
              </Col>
            </Row>
          </CardBody>
          {/* card footer */}
          <CardFooter className="border-top d-flex justify-content-center">
            {/* submit button */}
            <CustomButton
              loading={loadings.assignOffer}
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
export default AssignOffer;

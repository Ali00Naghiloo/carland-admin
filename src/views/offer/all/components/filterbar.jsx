import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  Collapse,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/offer_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  filters,
  setFilters,
  getOffers,
  getOperators,
  operatorsList,
  getOperatorsLoading,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const perPage = useSelector((state) => state.category.perPage);

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Card>
      {/* card title */}
      <CardHeader
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        className="border-bottom"
      >
        <CardTitle>جستجو و فیلتر</CardTitle>
        <div
          style={
            open
              ? { transform: "rotate(-180deg)", transition: "all .2s" }
              : { transition: "all .2s" }
          }
        >
          <IoIosArrowDown />
        </div>
      </CardHeader>
      {/* card body */}
      <Collapse isOpen={open}>
        <CardBody>
          <Row>
            {/* OfferName */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="OfferName" className="form-label">
                نام تخفیف
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="OfferName"
                  id="OfferName"
                  value={filters.OfferName}
                  onChange={(e) =>
                    setFilters({ ...filters, OfferName: e.target.value })
                  }
                />
                {filters?.OfferName?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, OfferName: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
            {/* OfferCode */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="OfferCode" className="form-label">
                کد تخفیف
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="OfferCode"
                  id="OfferCode"
                  value={filters.OfferCode}
                  onChange={(e) =>
                    setFilters({ ...filters, OfferCode: e.target.value })
                  }
                />
                {filters?.OfferCode?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, OfferCode: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
            {/* Price */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Price" className="form-label">
                مبلغ تخفیف
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Price"
                  id="Price"
                  type="number"
                  value={filters.Price}
                  onChange={(e) =>
                    setFilters({ ...filters, Price: e.target.value })
                  }
                />
                {filters?.Price?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Price: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
            {/* Percent */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Percent" className="form-label">
                درصد تخفیف
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Percent"
                  id="Percent"
                  type="number"
                  value={filters.Percent}
                  onChange={(e) =>
                    setFilters({ ...filters, Percent: e.target.value })
                  }
                />
                {filters?.Percent?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Percent: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
            {/* OperatorId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                اپراتور
              </Label>
              <Select
                value={filters.OperatorId}
                options={operatorsList}
                onChange={(value) =>
                  setFilters({ ...filters, OperatorId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                isLoading={getOperatorsLoading}
                disabled={getOperatorsLoading}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OperatorId"
                name="OperatorId"
              />
            </Col>
            {/* StartDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="StartDate" className="form-label">
                تاریخ شروع تخفیف
              </Label>
              <CustomDatePicker
                calendarPopperPosition="top"
                inputName="StartDate"
                value={filters.StartDate}
                onChange={(value) => {
                  setFilters({ ...filters, StartDate: value });
                }}
                onClear={() => setFilters({ ...filters, StartDate: null })}
                inputPlaceholder="انتخاب تاریخ"
              />
            </Col>
            {/* EndDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="EndDate" className="form-label">
                تاریخ پایان تخفیف
              </Label>
              <CustomDatePicker
                calendarPopperPosition="top"
                inputName="EndDate"
                value={filters.EndDate}
                onChange={(value) => {
                  setFilters({ ...filters, EndDate: value });
                }}
                onClear={() => setFilters({ ...filters, EndDate: null })}
                inputPlaceholder="انتخاب تاریخ"
              />
            </Col>
            {/* CreateDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="CreateDate" className="form-label">
                تاریخ ایجاد
              </Label>
              <CustomDatePicker
                calendarPopperPosition="top"
                range
                inputName="CreateDate"
                value={filters.CreateDate}
                onChange={(value) => {
                  setFilters({ ...filters, CreateDate: value });
                }}
                onClear={() =>
                  setFilters({
                    ...filters,
                    CreateDate: { from: null, to: null },
                  })
                }
                inputPlaceholder="انتخاب تاریخ"
              />
            </Col>
            {/* UserName */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="UserName" className="form-label">
                کاربر ایجاد کننده
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="UserName"
                  id="UserName"
                  value={filters.UserName}
                  onChange={(e) =>
                    setFilters({ ...filters, UserName: e.target.value })
                  }
                />
                {filters?.UserName?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, UserName: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
            {/* UpdateDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="UpdateDate" className="form-label">
                تاریخ ویرایش
              </Label>
              <CustomDatePicker
                calendarPopperPosition="top"
                range
                inputName="UpdateDate"
                value={filters.UpdateDate}
                onChange={(value) => {
                  setFilters({ ...filters, UpdateDate: value });
                }}
                onClear={() =>
                  setFilters({
                    ...filters,
                    UpdateDate: { from: null, to: null },
                  })
                }
                inputPlaceholder="انتخاب تاریخ"
              />
            </Col>
            {/* UserNameUpdate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="UserNameUpdate" className="form-label">
                کاربر ویرایش کننده
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="UserNameUpdate"
                  id="UserNameUpdate"
                  value={filters.UserNameUpdate}
                  onChange={(e) =>
                    setFilters({ ...filters, UserNameUpdate: e.target.value })
                  }
                />
                {filters?.UserNameUpdate?.length > 0 ? (
                  <IoClose
                    onClick={() =>
                      setFilters({ ...filters, UserNameUpdate: "" })
                    }
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
          {/* actions */}
          <Col sm="12" className="mt-2 d-flex justify-content-end">
            <CustomButton
              onClick={() => {
                setFilters({
                  OfferName: "",
                  OfferCode: "",
                  Price: "",
                  Percent: "",
                  StartDate: null,
                  EndDate: null,
                  OperatorId: null,
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                });
                dispatch(setCurrentPage(1));
                getOffers(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getOffers(1, perPage);
              }}
              color="primary"
            >
              جستجو و فیلتر
            </CustomButton>
          </Col>
        </CardBody>
      </Collapse>
    </Card>
  );
};
export default Filterbar;

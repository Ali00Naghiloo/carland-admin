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
import { AsyncPaginate } from "react-select-async-paginate";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/source_number_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  filters,
  setFilters,
  operatorsList,
  getSourceNumbers,
  getOperatorsLoading,
  numberTypesList,
  getNumberTypesLoading,
  numberLabelsList,
  getNumberLabelsLoading,
  getSelectPlans,
  getSelectCategories,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const currentPage = useSelector((state) => state.category.currentPage);
  const perPage = useSelector((state) => state.category.perPage);

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
            {/* Number */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Number" className="form-label">
                شماره تلفن
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Number"
                  id="Number"
                  type="number"
                  value={filters.Number}
                  onChange={(e) =>
                    setFilters({ ...filters, Number: e.target.value })
                  }
                />
                {filters?.Number?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Number: "" })}
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
            {/* LabelShowNumber */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="LabelShowNumber" className="form-label">
                فرمت نمایش
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="LabelShowNumber"
                  id="LabelShowNumber"
                  type="number"
                  value={filters.LabelShowNumber}
                  onChange={(e) =>
                    setFilters({ ...filters, LabelShowNumber: e.target.value })
                  }
                />
                {filters?.LabelShowNumber?.length > 0 ? (
                  <IoClose
                    onClick={() =>
                      setFilters({ ...filters, LabelShowNumber: "" })
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
                isLoading={getOperatorsLoading}
                isDisabled={getOperatorsLoading}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OperatorId"
                name="OperatorId"
              />
            </Col>
            {/* TypeNumberId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                نوع سیمکارت
              </Label>
              <Select
                value={filters.TypeNumberId}
                options={numberTypesList}
                onChange={(value) =>
                  setFilters({ ...filters, TypeNumberId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isLoading={getNumberTypesLoading}
                isDisabled={getNumberTypesLoading}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="TypeNumberId"
                name="TypeNumberId"
              />
            </Col>
            {/* LabelNumberId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                برچسب سیمکارت
              </Label>
              <Select
                value={filters.LabelNumberId}
                options={numberLabelsList}
                onChange={(value) =>
                  setFilters({ ...filters, LabelNumberId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isLoading={getNumberLabelsLoading}
                isDisabled={getNumberLabelsLoading}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="LabelNumberId"
                name="LabelNumberId"
              />
            </Col>
            {/* PlanId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label className="form-label" for="PlanId">
                طرح
              </Label>
              <AsyncPaginate
                value={filters.PlanId}
                onChange={(value) => setFilters({ ...filters, PlanId: value })}
                loadOptions={getSelectPlans}
                additional={{
                  page: 1,
                }}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="طرح را انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="PlanId"
                name="PlanId"
              />
            </Col>
            {/* CategoryId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label className="form-label" for="CategoryId">
                دسته بندی
              </Label>
              <AsyncPaginate
                value={filters.CategoryId}
                onChange={(value) =>
                  setFilters({ ...filters, CategoryId: value })
                }
                loadOptions={getSelectCategories}
                additional={{
                  page: 1,
                }}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="دسته بندی را انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="CategoryId"
                name="CategoryId"
              />
            </Col>
            {/* Price */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Price" className="form-label">
                قیمت
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
            {/* CreateDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="CreateDate" className="form-label">
                تاریخ ایجاد
              </Label>
              <CustomDatePicker
                range
                inputName="CreateDate"
                calendarPopperPosition="top"
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
                range
                calendarPopperPosition="top"
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
            {/* Active */}
            <Col
              xs="12"
              sm="6"
              md="3"
              className="d-flex align-items-center mb-1"
            >
              <div className="form-switch p-0 m-0">
                <div className="d-flex">
                  <Input
                    type="switch"
                    id="rtl"
                    className="m-0 p-0"
                    name="RTL"
                    checked={filters.Active}
                    onChange={(e) =>
                      setFilters({ ...filters, Active: e.target.checked })
                    }
                  />
                  <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                    شماره تلفن های فعال
                  </Label>
                </div>
              </div>
            </Col>
          </Row>
          {/* actions */}
          <Col sm="12" className="mt-2 d-flex justify-content-end">
            <CustomButton
              onClick={() => {
                setFilters({
                  Number: "",
                  LabelShowNumber: "",
                  OperatorId: null,
                  TypeNumberId: null,
                  LabelNumberId: null,
                  PlanId: null,
                  CategoryId: null,
                  Price: "",
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  Active: true,
                });
                dispatch(setCurrentPage(1));
                getSourceNumbers(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getSourceNumbers(1, perPage);
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

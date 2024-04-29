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
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/service_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  filters,
  setFilters,
  getServices,
  getSelectCategories,
  getSelectOffers,
  operatorsList,
  getOperatorsLoading,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
            {/* Name */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Name" className="form-label">
                نام خدمت
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Name"
                  id="Name"
                  value={filters.Name}
                  onChange={(e) =>
                    setFilters({ ...filters, Name: e.target.value })
                  }
                />
                {filters?.Name?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Name: "" })}
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
            {/* OpratorTableId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                اپراتور
              </Label>
              <Select
                value={filters.OpratorTableId}
                options={operatorsList}
                onChange={(value) =>
                  setFilters({ ...filters, OpratorTableId: value })
                }
                isDisabled={getOperatorsLoading}
                isLoading={getOperatorsLoading}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OpratorTableId"
                name="OpratorTableId"
              />
            </Col>
            {/* CategoryId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                دسته بندی
              </Label>
              <AsyncPaginate
                value={filters.CategoryId}
                loadOptions={getSelectCategories}
                onChange={(value) =>
                  setFilters({ ...filters, CategoryId: value })
                }
                additional={{
                  page: 1,
                }}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="CategoryId"
                name="CategoryId"
              />
            </Col>
            {/* CreditPrice */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="CreditPrice" className="form-label">
                قیمت اعتباری
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="CreditPrice"
                  id="CreditPrice"
                  value={filters.CreditPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, CreditPrice: e.target.value })
                  }
                />
                {filters?.CreditPrice?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, CreditPrice: "" })}
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
            {/* FixedPrice */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="FixedPrice" className="form-label">
                قیمت دائمی
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="FixedPrice"
                  id="FixedPrice"
                  value={filters.FixedPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, FixedPrice: e.target.value })
                  }
                />
                {filters?.FixedPrice?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, FixedPrice: "" })}
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
            {/* OfferId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                تخفیف
              </Label>
              <AsyncPaginate
                value={filters.OfferId}
                loadOptions={getSelectOffers}
                onChange={(value) => setFilters({ ...filters, OfferId: value })}
                additional={{
                  page: 1,
                }}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OfferId"
                name="OfferId"
              />
            </Col>
            {/* Score */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Score" className="form-label">
                امتیاز
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="Score"
                  id="Score"
                  value={filters.Score}
                  onChange={(e) =>
                    setFilters({ ...filters, Score: e.target.value })
                  }
                />
                {filters?.Score?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Score: "" })}
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
                calendarPopperPosition="bottom"
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
                calendarPopperPosition="bottom"
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
            {/* IsActive */}
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
                    checked={filters.IsActive}
                    onChange={(e) =>
                      setFilters({ ...filters, IsActive: e.target.checked })
                    }
                  />
                  <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                    خدمات فعال
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
                  Name: "",
                  OpratorTableId: null,
                  CategoryId: null,
                  CreditPrice: "",
                  FixedPrice: "",
                  OfferId: null,
                  Score: "",
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  IsActive: true,
                });
                dispatch(setCurrentPage(1));
                getServices(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getServices(1, perPage);
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

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
import { setCurrentPage } from "../../../../redux/category_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  filters,
  setFilters,
  getProducts,
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
                نام محصول
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
            {/* StockSite */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="StockSite" className="form-label">
                تعداد در سایت
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="StockSite"
                  id="StockSite"
                  value={filters.StockSite}
                  onChange={(e) =>
                    setFilters({ ...filters, StockSite: e.target.value })
                  }
                />
                {filters?.StockSite?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, StockSite: "" })}
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
            {/* StockAgent */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="StockAgent" className="form-label">
                تعداد برای نمایندگان
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="StockAgent"
                  id="StockAgent"
                  value={filters.StockAgent}
                  onChange={(e) =>
                    setFilters({ ...filters, StockAgent: e.target.value })
                  }
                />
                {filters?.StockAgent?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, StockAgent: "" })}
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
                isDisabled={getOperatorsLoading}
                isLoading={getOperatorsLoading}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OperatorId"
                name="OperatorId"
              />
            </Col>
            {/* Priceseller */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Priceseller" className="form-label">
                قیمت نمایندگان
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="Priceseller"
                  id="Priceseller"
                  value={filters.Priceseller}
                  onChange={(e) =>
                    setFilters({ ...filters, Priceseller: e.target.value })
                  }
                />
                {filters?.Priceseller?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Priceseller: "" })}
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
            {/* PriceBuy */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="PriceBuy" className="form-label">
                قیمت فروش
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="PriceBuy"
                  id="PriceBuy"
                  value={filters.PriceBuy}
                  onChange={(e) =>
                    setFilters({ ...filters, PriceBuy: e.target.value })
                  }
                />
                {filters?.PriceBuy?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, PriceBuy: "" })}
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
            {/* Brand */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Brand" className="form-label">
                نام برند محصول
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Brand"
                  id="Brand"
                  value={filters.Brand}
                  onChange={(e) =>
                    setFilters({ ...filters, Brand: e.target.value })
                  }
                />
                {filters?.Brand?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Brand: "" })}
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
            {/* Serial */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Serial" className="form-label">
                سریال محصول
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Serial"
                  id="Serial"
                  value={filters.Serial}
                  onChange={(e) =>
                    setFilters({ ...filters, Serial: e.target.value })
                  }
                />
                {filters?.Serial?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Serial: "" })}
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
                    محصولات فعال
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
                  StockSite: "",
                  StockAgent: "",
                  CategoryId: null,
                  OperatorId: null,
                  Priceseller: "",
                  PriceBuy: "",
                  Brand: "",
                  Serial: "",
                  OfferId: null,
                  Score: "",
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  Active: true,
                });
                dispatch(setCurrentPage(1));
                getProducts(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getProducts(1, perPage);
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

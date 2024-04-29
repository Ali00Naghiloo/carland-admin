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
import { selectThemeColors } from "@utils";
import CustomButton from "../../../../components/button";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/category_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  getDeliveries,
  getProvinces,
  getFilterCities,
  filters,
  setFilters,
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
            {/* ProvincesId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label className="form-label" for="ProvincesId">
                استان
              </Label>
              <AsyncPaginate
                value={filters.ProvincesId}
                loadOptions={getProvinces}
                onChange={(value) =>
                  setFilters({ ...filters, ProvincesId: value, CitiesId: null })
                }
                additional={{
                  page: 1,
                }}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="استان را انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="ProvincesId"
                name="ProvincesId"
              />
            </Col>
            {/* CitiesId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label className="form-label" for="CitiesId">
                شهر
              </Label>
              <AsyncPaginate
                value={filters.CitiesId}
                loadOptions={getFilterCities}
                onChange={(value) =>
                  setFilters({ ...filters, CitiesId: value })
                }
                additional={{
                  page: 1,
                }}
                cacheUniqs={[filters.ProvincesId]}
                isDisabled={!filters.ProvincesId}
                loadingMessage={() => "در حال بارگذاری . . ."}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="شهر را انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="CitiesId"
                name="CitiesId"
              />
            </Col>
            {/* Price */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label className="form-label" for="Price">
                هزینه ارسال (تومان)
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  value={filters.Price}
                  onChange={(e) =>
                    setFilters({ ...filters, Price: e.target.value })
                  }
                  type="number"
                  id="Price"
                  name="Price"
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
            {/* is_active */}
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
                    checked={filters.is_active}
                    onChange={(e) =>
                      setFilters({ ...filters, is_active: e.target.checked })
                    }
                  />
                  <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                    دسته بندی های فعال
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
                  ProvincesId: null,
                  CitiesId: null,
                  Price: "",
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  is_active: true,
                });
                dispatch(setCurrentPage(1));
                getDeliveries(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getDeliveries(1, perPage);
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

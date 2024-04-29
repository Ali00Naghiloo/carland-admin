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
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/plan_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  getPlans,
  filters,
  setFilters,
  getSelectCategories,
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
            {/* Name */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Name" className="form-label">
                نام طرح
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
            {/* OpratorId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                اپراتور
              </Label>
              <Select
                value={filters.OpratorId}
                options={operatorsList}
                onChange={(value) =>
                  setFilters({ ...filters, OpratorId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                isLoading={getOperatorsLoading}
                disabled={getOperatorsLoading}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="OpratorId"
                name="OpratorId"
              />
            </Col>
            {/* CountStar */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="CountStar" className="form-label">
                تعداد ستاره های طرح
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="CountStar"
                  id="CountStar"
                  type="number"
                  value={filters.CountStar}
                  onChange={(e) =>
                    setFilters({ ...filters, CountStar: e.target.value })
                  }
                />
                {filters?.CountStar?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, CountStar: "" })}
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
            {/* Summray */}
            <Col xs="12" className="mb-1">
              <Label for="Summray" className="form-label">
                خلاصه طرح
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Summray"
                  id="Summray"
                  type="textarea"
                  value={filters.Summray}
                  onChange={(e) =>
                    setFilters({ ...filters, Summray: e.target.value })
                  }
                />
                {filters?.Summray?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Summray: "" })}
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
            {/* Description */}
            <Col xs="12" className="mb-1">
              <Label for="Description" className="form-label">
                توضیحات طرح
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Description"
                  id="Description"
                  type="textarea"
                  value={filters.Description}
                  onChange={(e) =>
                    setFilters({ ...filters, Description: e.target.value })
                  }
                />
                {filters?.Description?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Description: "" })}
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
                  Name: "",
                  Summray: "",
                  CountStar: "",
                  Description: "",
                  CategoryId: null,
                  OpratorId: null,
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                });
                dispatch(setCurrentPage(1));
                getPlans(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getPlans(1, perPage);
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

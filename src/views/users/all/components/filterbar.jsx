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
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/users_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";

const Filterbar = ({
  filters,
  setFilters,
  getUsers,
  getNationalityLoading,
  nationalityData,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const today = useSelector((state) => state.app.today);
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
            {/* PhoneNumber */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="PhoneNumber" className="form-label">
                شماره موبایل
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="PhoneNumber"
                  id="PhoneNumber"
                  type="PhoneNumber"
                  value={filters.PhoneNumber}
                  onChange={(e) =>
                    setFilters({ ...filters, PhoneNumber: e.target.value })
                  }
                />
                {filters?.PhoneNumber?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, PhoneNumber: "" })}
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
            {/* NationalCode */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="NationalCode" className="form-label">
                کد ملی
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="NationalCode"
                  id="NationalCode"
                  type="NationalCode"
                  value={filters.NationalCode}
                  onChange={(e) =>
                    setFilters({ ...filters, NationalCode: e.target.value })
                  }
                />
                {filters?.NationalCode?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, NationalCode: "" })}
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
            {/* FirstName */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="FirstName" className="form-label">
                نام
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="FirstName"
                  id="FirstName"
                  type="FirstName"
                  value={filters.FirstName}
                  onChange={(e) =>
                    setFilters({ ...filters, FirstName: e.target.value })
                  }
                />
                {filters?.FirstName?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, FirstName: "" })}
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
            {/* LastName */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="LastName" className="form-label">
                نام خانوادگی
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="LastName"
                  id="LastName"
                  type="LastName"
                  value={filters.LastName}
                  onChange={(e) =>
                    setFilters({ ...filters, LastName: e.target.value })
                  }
                />
                {filters?.LastName?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, LastName: "" })}
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
            {/* BirthDate */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="BirthDate" className="form-label">
                تاریخ تولد
              </Label>
              <CustomDatePicker
                calendarPopperPosition="top"
                inputName="BirthDate"
                value={filters.BirthDate}
                maximumDate={today}
                onChange={(value) => {
                  setFilters({ ...filters, BirthDate: value });
                }}
                onClear={() =>
                  setFilters({
                    ...filters,
                    BirthDate: null,
                  })
                }
                inputPlaceholder="انتخاب تاریخ"
              />
            </Col>
            {/* FatherName */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="FatherName" className="form-label">
                نام پدر
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="FatherName"
                  id="FatherName"
                  type="FatherName"
                  value={filters.FatherName}
                  onChange={(e) =>
                    setFilters({ ...filters, FatherName: e.target.value })
                  }
                />
                {filters?.FatherName?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, FatherName: "" })}
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
            {/* Gender */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Gender" className="form-label">
                جنسیت
              </Label>
              <Select
                value={filters.Gender}
                options={[
                  { label: "مرد", value: "مرد" },
                  { label: "زن", value: "زن" },
                ]}
                onChange={(value) => setFilters({ ...filters, Gender: value })}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="Gender"
                name="Gender"
              />
            </Col>
            {/* NationalityId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="NationalityId" className="form-label">
                ملیت
              </Label>
              <Select
                value={filters.NationalityId}
                options={nationalityData}
                onChange={(value) =>
                  setFilters({ ...filters, NationalityId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isLoading={getNationalityLoading}
                isDisabled={getNationalityLoading}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="NationalityId"
                name="NationalityId"
              />
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
          </Row>
          {/* actions */}
          <Col sm="12" className="mt-2 d-flex justify-content-end">
            <CustomButton
              onClick={() => {
                setFilters({
                  PhoneNumber: "",
                  NationalCode: "",
                  FirstName: "",
                  LastName: "",
                  BirthDate: null,
                  FatherName: "",
                  Gender: null,
                  NationalityId: null,
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                });
                dispatch(setCurrentPage(1));
                getUsers(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getUsers(1, perPage);
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

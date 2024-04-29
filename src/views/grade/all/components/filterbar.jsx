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
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../redux/grade_slice";
import CustomDatePicker from "../../../../components/datepicker";

const Filterbar = ({ filters, setFilters, operatorsList, getGrades }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const perPage = useSelector((state) => state.grade.perPage);

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
            {/* name */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="name" className="form-label">
                نام گرید
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="name"
                  id="name"
                  type="name"
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                />
                {filters?.name?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, name: "" })}
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
            {/* operatorId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="ParentName" className="form-label">
                اپراتور
              </Label>
              <Select
                value={filters.operatorId}
                options={operatorsList}
                onChange={(value) =>
                  setFilters({ ...filters, operatorId: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="operatorId"
                name="operatorId"
              />
            </Col>
            {/* score */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="score" className="form-label">
                امتیاز
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="score"
                  id="score"
                  type="number"
                  value={filters.score}
                  onChange={(e) =>
                    setFilters({ ...filters, score: e.target.value })
                  }
                />
                {filters?.score?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, score: "" })}
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
            {/* active */}
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
                    checked={filters.active}
                    onChange={(e) =>
                      setFilters({ ...filters, active: e.target.checked })
                    }
                  />
                  <Label style={{ paddingTop: 2, marginRight: 5 }} check>
                    گرید های فعال
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
                  name: "",
                  operatorId: "",
                  type: "",
                  score: "",
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  active: true,
                });
                dispatch(setCurrentPage(1));
                getGrades(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getGrades(1, perPage);
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

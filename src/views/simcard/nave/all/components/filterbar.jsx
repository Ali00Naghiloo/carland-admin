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
import CustomButton from "../../../../../components/button";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../../redux/simcard_nave_slice";
import CustomDatePicker from "../../../../../components/datepicker";
import { IoClose } from "react-icons/io5";
import formatHelper from "../../../../../helper/format_helper";

const Filterbar = ({
  filters,
  setFilters,
  getSimcardNaves,
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
            {/* Serial */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Serial" className="form-label">
                سریال سیمکارت
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
            {/* OperatorId */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="OperatorId" className="form-label">
                اپراتور
              </Label>
              <Select
                value={filters.OperatorId}
                options={operatorsList}
                isDisabled={getOperatorsLoading}
                isLoading={getOperatorsLoading}
                onChange={(value) =>
                  setFilters({ ...filters, OperatorId: value })
                }
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
            {/* Price */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Price" className="form-label">
                قیمت
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="Price"
                  id="Price"
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
            {/* Status */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Status" className="form-label">
                وضعیت سیمکارت
              </Label>
              <Select
                value={filters.Status}
                options={[
                  { label: "بدون شماره", value: 0 },
                  { label: "با شماره", value: 1 },
                ]}
                onChange={(value) => setFilters({ ...filters, Status: value })}
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="Status"
                name="Status"
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
          </Row>
          {/* actions */}
          <Col sm="12" className="mt-2 d-flex justify-content-end">
            <CustomButton
              onClick={() => {
                setFilters({
                  OperatorId: null,
                  Serial: "",
                  Price: "",
                  Status: null,
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                });
                dispatch(setCurrentPage(1));
                getSimcardNaves(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getSimcardNaves(1, perPage);
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

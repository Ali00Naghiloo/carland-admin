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
import { setCurrentPage } from "../../../../redux/modem_package_slice";
import CustomDatePicker from "../../../../components/datepicker";
import { IoClose } from "react-icons/io5";
import {
  PACKET_TIME_DATA,
  TYPE_INTERNET_DATA,
} from "../../../../utility/data/modem_package";
import { formatBytes } from "../../../../helper/format_unit";
import formatHelper from "../../../../helper/format_helper";

const Filterbar = ({
  filters,
  setFilters,
  getModemPackages,
  getOperators,
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
            {/* Namepacket */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Namepacket" className="form-label">
                نام بسته
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  name="Namepacket"
                  id="Namepacket"
                  value={filters.Namepacket}
                  onChange={(e) =>
                    setFilters({ ...filters, Namepacket: e.target.value })
                  }
                />
                {filters?.Namepacket?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, Namepacket: "" })}
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
            {/* packetvolume */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="packetvolume" className="form-label">
                حجم بسته
              </Label>
              <div className="position-relative d-flex align-items-center">
                <Input
                  type="number"
                  name="packetvolume"
                  id="packetvolume"
                  value={filters.packetvolume}
                  onChange={(e) =>
                    setFilters({ ...filters, packetvolume: e.target.value })
                  }
                />
                {filters?.packetvolume?.length > 0 ? (
                  <IoClose
                    onClick={() => setFilters({ ...filters, packetvolume: "" })}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                    }}
                    fontSize={20}
                  />
                ) : null}
                {filters?.packetvolume?.length > 0 ? (
                  <div
                    style={{
                      paddingTop: 3,
                      fontSize: 10,
                      position: "absolute",
                      left: 30,
                    }}
                  >
                    {formatHelper.toPersianString(
                      formatBytes(filters.packetvolume)
                    )}
                  </div>
                ) : null}
              </div>
            </Col>
            {/* packetTime */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="packetTime" className="form-label">
                مدت زمان بسته
              </Label>
              <Select
                value={filters.packetTime}
                options={PACKET_TIME_DATA}
                onChange={(value) =>
                  setFilters({ ...filters, packetTime: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="packetTime"
                name="packetTime"
              />
            </Col>
            {/* Price */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="Price" className="form-label">
                قیمت بسته
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
            {/* TypeInternet */}
            <Col xs="12" sm="6" md="3" className="mb-1">
              <Label for="TypeInternet" className="form-label">
                نوع بسته
              </Label>
              <Select
                value={filters.TypeInternet}
                options={TYPE_INTERNET_DATA}
                onChange={(value) =>
                  setFilters({ ...filters, TypeInternet: value })
                }
                closeMenuOnSelect={true}
                theme={selectThemeColors}
                isClearable={true}
                placeholder="انتخاب کنید"
                className={"react-select"}
                classNamePrefix="select"
                id="TypeInternet"
                name="TypeInternet"
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
                  Namepacket: "",
                  packetvolume: "",
                  packetTime: null,
                  Price: "",
                  OperatorId: null,
                  TypeInternet: null,
                  CreateDate: { from: null, to: null },
                  UserName: "",
                  UpdateDate: { from: null, to: null },
                  UserNameUpdate: "",
                  Active: true,
                });
                dispatch(setCurrentPage(1));
                getModemPackages(1, perPage, "without_filter");
              }}
              color="danger"
            >
              پاک کردن فیلتر ها
            </CustomButton>
            <CustomButton
              style={{ marginRight: 8 }}
              onClick={() => {
                dispatch(setCurrentPage(1));
                getModemPackages(1, perPage);
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

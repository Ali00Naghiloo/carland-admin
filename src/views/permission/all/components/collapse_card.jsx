import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  Card,
  CardBody,
  Label,
  Collapse,
  Col,
  Input,
  CardTitle,
  CardHeader,
} from "reactstrap";

const CollapseCard = ({ item }) => {
  const [open, setOpen] = useState(true);
  return (
    <Col xs="12" sm="6" md="4" className="mb-1">
      <Card className="mb-0" onClick={() => console.log(item)}>
        {/* card title */}
        <CardHeader
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(!open);
          }}
          className="border-bottom"
        >
          <CardTitle style={{ fontSize: 16 }}>{item.label}</CardTitle>
          <div
            style={
              open
                ? {
                    transform: "rotate(-180deg)",
                    transition: "all .2s",
                  }
                : { transition: "all .2s" }
            }
          >
            <IoIosArrowDown />
          </div>
        </CardHeader>
        {/* card body */}
        <Collapse isOpen={open}>
          <CardBody className="pb-0">
            {item.value.map((val, i) => (
              <Col className="mb-1" key={i}>
                <div className="form-switch p-0 m-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <Label style={{ paddingTop: 2, marginLeft: 8 }} check>
                      {val.actionName}
                    </Label>
                    <Input
                      type="switch"
                      id="rtl"
                      className="m-0 p-0"
                      name="RTL"
                      // onChange={(e) => {
                      //   let array = [
                      //     ...createPermissionController.values
                      //       .permissionDatas,
                      //   ];
                      //   if (e.target.checked === false) {
                      //     array = array.filter(
                      //       (vall) =>
                      //         val.actionName !== vall.actionName
                      //     );
                      //   } else {
                      //     array.push({
                      //       ...val,
                      //       entityName: item.label,
                      //     });
                      //   }
                      //   createPermissionController.setFieldValue(
                      //     "permissionDatas",
                      //     array
                      //   );
                      // }}
                      checked={val.isActive}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    </Col>
  );
};
export default CollapseCard;

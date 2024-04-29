import { useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ImMobile, AiOutlinePhone } from "react-icons/all";
import formatHelper from "../../../helper/format_helper";

const ProfileNumbers = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <Card>
      <CardBody className="profile-suggestion">
        <h5 className="mb-2">شماره تماس ها</h5>
        <Row>
          {/* mobiles */}
          <Col md="6" sm="12">
            {userData?.salon_mobile
              ? userData?.salon_mobile?.map((mobile, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <ImMobile fontSize={20} />
                    <span style={{ marginRight: 5, fontSize: 18 }}>
                      {formatHelper.toPersianString(mobile?.value)}
                    </span>
                  </div>
                ))
              : "شماره موبایلی وارد نشده"}
          </Col>
          {/* phones */}
          <Col md="6" sm="12">
            {userData?.salon_phone
              ? userData?.salon_phone?.map((phone, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <AiOutlinePhone fontSize={20} />
                    <span style={{ marginRight: 5, fontSize: 18 }}>
                      {formatHelper.toPersianString(phone?.value)}
                    </span>
                  </div>
                ))
              : "شماره تلفن ثابتی وارد نشده"}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ProfileNumbers;

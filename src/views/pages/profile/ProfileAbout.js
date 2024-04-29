import { Card, CardBody, CardText } from "reactstrap";
import { useSelector } from "react-redux";

const ProfileAbout = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <Card>
      <CardBody>
        {/* about */}
        <div className="mb-2">
          <h5 className="mb-75">درباره سالن</h5>
          <CardText>
            {userData?.description
              ? userData?.description
              : "توضیحات وارد نشده"}
          </CardText>
        </div>
        {/* address */}
        <div className="mb-2">
          <h5 className="mb-75">آدرس سالن</h5>
          <CardText>
            {userData?.address ? userData?.address : "آدرس وارد نشده"}
          </CardText>
        </div>
        {/* email */}
        <div className="mb-2">
          <h5 className="mb-75">ایمیل</h5>
          <CardText>
            {userData?.email ? userData?.email : "ایمیل وارد نشده"}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;

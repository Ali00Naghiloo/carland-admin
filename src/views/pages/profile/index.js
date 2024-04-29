import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileNumbers from "./ProfileNumbers";
import "@styles/react/pages/page-profile.scss";

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <Fragment>
      <Breadcrumbs
        title="نمایش حساب کاربری"
        data={[{ title: "حساب کاربری" }, { title: "نمایش حساب کاربری" }]}
      />
      {userData !== null ? (
        <div id="user-profile">
          {/* profile header */}
          <Row>
            <Col sm="12">
              <ProfileHeader />
            </Col>
          </Row>
          {/* profile cards */}
          <section id="profile-info">
            <Row>
              <Col lg={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                {/* about */}
                <ProfileAbout />
                {/* numbers */}
                <ProfileNumbers />
              </Col>
            </Row>
          </section>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;

import { Card, CardImg, Navbar, Button } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../assets/image/logo.svg";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  return (
    <Card className="profile-header mb-2">
      {/* banner image */}
      <div>
        <CardImg
          src={userData?.banner_url}
          alt="Salon Banner"
          top
          height={300}
          style={{
            objectFit: "cover",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(255, 255, 255, 0))",
          }}
        ></div>
      </div>
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          {/* logo image */}
          <div className="profile-img">
            {userData?.profile_url ? (
              <img
                className="rounded img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={userData?.profile_url}
                alt="Card image"
              />
            ) : (
              <img
                className="rounded img-fluid"
                style={{ width: "100%", height: "100%" }}
                src={logoImage}
                alt="Card image"
              />
            )}
          </div>
          <div className="profile-title ms-3">
            {/* first name and last name */}
            <h2 className="text-white">
              {userData?.first_name ? userData?.first_name : ""}{" "}
              {userData?.last_name ? userData?.last_name : ""}
            </h2>
            {/* salon name */}
            <p className="text-white">{userData?.name ? userData?.name : ""}</p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <div className="profile-tabs" style={{ direction: "ltr" }}>
            <Button
              color="primary"
              onClick={() => navigate("/pages/account-settings")}
            >
              <span className="fw-bold d-md-block">ویرایش حساب کاربری</span>
            </Button>
          </div>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;

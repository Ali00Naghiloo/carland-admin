import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  CardText,
  CardTitle,
  FormFeedback,
} from "reactstrap";
import CustomButton from "../../../components/button";
import "@styles/react/pages/page-authentication.scss";
import useAuth from "../../../hooks/use_auth";
import formatHelper from "../../../helper/format_helper";
import version from "../../../constant/version.json";
import InputPasswordToggle from "@components/input-password-toggle";

const Login = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const { getTokenController, loadings } = useAuth();

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          {/* <img src={logoImage} alt="کارلند" /> */}
          <h2 className="brand-text text-primary ms-1">کارلند</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto rtl" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="text-bold mb-1 text-center">
              به پنل ادمین کارلند خوش آمدید! 👋
            </CardTitle>
            <CardText className="mb-2 text-center">
              لطفا برای وارد شدن به حساب کاربری خود نام کاربری و رمز عبور خود را
              وارد کنید.
            </CardText>
            {/* get verification code form */}
            <Form
              className="auth-login-form mt-2"
              onSubmit={getTokenController.handleSubmit}
            >
              {/* username */}
              <div className="mb-1">
                <Label className="form-label w-100" for="ز">
                  نام کاربری
                </Label>
                <Input
                  disabled={loadings.handleLogin}
                  autoFocus
                  placeholder="نام کاربری خود را وارد کنید"
                  type="text"
                  id="username"
                  name="username"
                  style={{ textAlign: "right" }}
                  value={getTokenController.values.username}
                  onChange={getTokenController.handleChange}
                  invalid={
                    getTokenController.touched.username
                      ? getTokenController.errors.username
                      : null
                  }
                />
                {getTokenController.touched.username &&
                getTokenController.errors.username ? (
                  <FormFeedback>
                    {getTokenController.errors.username}
                  </FormFeedback>
                ) : null}
              </div>

              {/* password */}
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label w-100" for="password">
                    رمز عبور
                  </Label>
                </div>
                <InputPasswordToggle
                  id="password"
                  name="password"
                  className="input-group-merge"
                  direction="ltr"
                  disabled={loadings.handleLogin}
                  value={getTokenController.values.password}
                  onChange={getTokenController.handleChange}
                  invalid={
                    getTokenController.touched.password &&
                    getTokenController.errors.password
                  }
                />
                {getTokenController.touched.password &&
                getTokenController.errors.password ? (
                  <FormFeedback>
                    {getTokenController.errors.password}
                  </FormFeedback>
                ) : null}
              </div>

              <CustomButton
                type="submit"
                className="mt-2"
                color={loadings.handleLogin ? "secondary" : "primary"}
                loading={loadings.handleLogin}
                block
              >
                ورود
              </CustomButton>
            </Form>
            <div className="w-100 d-flex justify-content-center mt-2">
              نسخه {formatHelper.toPersianString(version.app_version)}
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

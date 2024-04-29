import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { User, Power, Bell } from "react-feather";
import useAuth from "../../../../hooks/use_auth";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { AiOutlineSetting } from "react-icons/all";
import logoImage from "../../../../assets/image/logo_mini.svg";
import Skeleton from "../../../../components/skeleton";
import Confirm from "../../../../components/confirm";

const UserDropdown = () => {
  const { handleLogout, loadings } = useAuth();

  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const getUserDataLoading = useSelector(
    (state) => state.user.getUserDataLoading
  );
  const userData = useSelector((state) => state.user.userData);

  return (
    <Fragment>
      <UncontrolledDropdown
        tag="li"
        className="dropdown-user nav-item"
        style={{ marginRight: 16 }}
      >
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <div className="user-nav d-sm-flex d-none">
            {getUserDataLoading ? (
              <Skeleton style={{ width: 80, height: 10, borderRadius: 10 }} />
            ) : (
              <span className="user-name fw-bold" style={{ marginTop: 5 }}>
                {userData?.name ? userData?.name : null}
              </span>
            )}
          </div>
          {getUserDataLoading ? (
            <Skeleton style={{ width: 40, height: 40, borderRadius: "50%" }} />
          ) : (
            <div className="navbar_user_avatar">
              {userData?.profile_url ? (
                <img
                  style={{ objectFit: "cover" }}
                  src={userData?.profile_url}
                  alt="user avatar"
                />
              ) : (
                <img src={logoImage} alt="کارلند" />
              )}
            </div>
          )}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag={Link} to="/pages/profile">
            <User size={14} className="me-75" />
            <span className="align-middle">حساب کاربری</span>
          </DropdownItem>
          <DropdownItem tag={Link} to="/pages/account-settings">
            <AiOutlineSetting size={14} className="me-75" />
            <span className="align-middle">تنظیمات</span>
          </DropdownItem>
          <DropdownItem tag={Link} to="/pages/announcements">
            <Bell size={14} className="me-75" />
            <span className="align-middle">پیام ها</span>
          </DropdownItem>
          <DropdownItem tag={"div"} onClick={() => setLogoutConfirm(1)}>
            <Power size={14} className="me-75" />
            <span className="align-middle">خروج</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Confirm
        visible={logoutConfirm}
        setVisible={setLogoutConfirm}
        title={"آیا برای خروج از برنامه مطمئن هستید؟"}
        noAction={() => setLogoutConfirm(false)}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.handleLogout}
        yesAction={handleLogout}
        yesColor={"danger"}
        yesTitle={"خروج"}
        type={"local"}
      />
    </Fragment>
  );
};

export default UserDropdown;

import { useEffect, useState } from "react";
import { Bell } from "react-feather";
import {
  Button,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import formatHelper from "../../../../helper/format_helper";

const NotificationDropdown = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <UncontrolledDropdown
      tag="li"
      isOpen={openMenu}
      toggle={toggleMenu}
      className="dropdown-notification nav-item me-25"
      style={{ marginRight: 16 }}
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          toggleMenu();
        }}
      >
        <Bell size={21} />
        <Badge
          pill
          color="danger"
          className="badge-up"
          style={{ minWidth: 10, minHeight: 10, left: 7.5, top: -4 }}
        ></Badge>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">پیام ها</h4>
            <Badge tag="div" color="light-primary" pill>
              تعداد کل پیام ها : {formatHelper.toPersianString(0)}
            </Badge>
          </DropdownItem>
        </li>
        {/* {renderNotificationItems()} */}
        <li className="dropdown-menu-footer">
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggleMenu();
              navigate("/pages/announcements");
            }}
            color="primary"
            block
          >
            مشاهده همه ی پیام ها
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;

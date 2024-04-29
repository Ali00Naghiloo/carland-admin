import { Nav, NavItem, NavLink } from "reactstrap";
import { User, Lock } from "react-feather";
import { useNavigate } from "react-router-dom";
import { IoImagesOutline, TbMoneybag, RiReservedLine } from "react-icons/all";

const Tabs = ({ activeTab, toggleTab }) => {
  const navigate = useNavigate();
  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink
          style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
          active={activeTab === "1"}
          onClick={() => {
            toggleTab("1");
            navigate("/pages/account-settings");
          }}
        >
          <User size={18} style={{ marginLeft: 3 }} />
          <span className="fw-bold">مشخصات</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
          active={activeTab === "2"}
          onClick={() => {
            toggleTab("2");
            navigate("/pages/account-settings?tab=fincance");
          }}
        >
          <TbMoneybag size={18} style={{ marginLeft: 3 }} />
          <span className="fw-bold">مالی</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
          active={activeTab === "3"}
          onClick={() => {
            toggleTab("3");
            navigate("/pages/account-settings?tab=reservation");
          }}
        >
          <RiReservedLine size={18} style={{ marginLeft: 3 }} />
          <span className="fw-bold">نوبت دهی</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
          active={activeTab === "4"}
          onClick={() => {
            toggleTab("4");
            navigate("/pages/account-settings?tab=images");
          }}
        >
          <IoImagesOutline size={18} style={{ marginLeft: 3 }} />
          <span className="fw-bold">تصاویر</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          style={{ paddingRight: 8, paddingLeft: 8 }}
          active={activeTab === "5"}
          onClick={() => {
            toggleTab("5");
            navigate("/pages/account-settings?tab=security");
          }}
        >
          <Lock size={18} style={{ marginLeft: 3 }} />
          <span className="fw-bold">امنیت</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;

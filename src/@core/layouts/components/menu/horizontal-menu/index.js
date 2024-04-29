// ** Horizontal Menu Components
import HorizontalNavMenuItems from "./HorizontalNavMenuItems";

const HorizontalMenu = ({ menuData }) => {
  return (
    <div className="navbar-container main-menu-content">
      <ul
        className="nav navbar-nav"
        id="main-menu-navigation"
        style={{ overflowX: "auto", flexWrap: "unset" }}
      >
        <HorizontalNavMenuItems submenu={false} items={menuData} />
      </ul>
    </div>
  );
};

export default HorizontalMenu;

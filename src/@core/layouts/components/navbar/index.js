import { Fragment, useEffect } from "react";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarWallet from "./wallet";

const ThemeNavbar = (props) => {
  const { skin, setSkin, setMenuVisibility } = props;
  // const {
  //   getUserProfile,
  // } = useUser();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getUserProfile();
  //   }
  // }, []);

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        {/* <NavbarWallet /> */}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;

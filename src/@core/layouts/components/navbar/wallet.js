import "./navbar.scss";
import formatHelper from "../../../../helper/format_helper";
import { useSelector } from "react-redux";
import PN from "persian-number";
import Skeleton from "../../../../components/skeleton";
import { Fragment } from "react";

const NavbarWallet = () => {
  const userWallet = useSelector((state) => state.user.userWallet);
  const getUserWalletLoading = useSelector(
    (state) => state.user.getUserWalletLoading
  );

  return (
    <div className="navbar_user_wallet">
      <div>موجودی حساب : </div>
      {getUserWalletLoading ? (
        <Skeleton style={{ width: 100, height: 15, borderRadius: 10 }} />
      ) : (
        <Fragment>
          <div style={userWallet > 0 ? { color: "#28c76f" } : null}>
            {userWallet
              ? formatHelper.toPersianString(
                  formatHelper.numberSeperator(userWallet)
                )
              : "۰"}
          </div>
          <div>
            {"("}
            {userWallet ? PN.convert(userWallet) : "صفر"}
            {")"}
          </div>
          <div>تومان</div>
        </Fragment>
      )}
    </div>
  );
};

export default NavbarWallet;

import { Fragment, useState } from "react";
import { Row, Col, TabContent, TabPane } from "reactstrap";
import Tabs from "./Tabs";
import Breadcrumbs from "@components/breadcrumbs";
import AccountTabContent from "./AccountTabContent";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { useSelector } from "react-redux";
import ProgressLoading from "../../../components/progress_loading";
import CustomLoading from "../../../components/loading";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("1");

  const getUserDataLoading = useSelector(
    (state) => state.user.getUserDataLoading
  );
  const userData = useSelector((state) => state.user.userData);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="تنظیمات حساب کاربری"
        data={[{ title: "حساب کاربری" }, { title: "تنظیمات حساب کاربری" }]}
      />
      {/* progress loading */}
      {getUserDataLoading ? <ProgressLoading /> : null}
      {/* circle loading */}
      {getUserDataLoading ? <CustomLoading /> : null}
      {!getUserDataLoading && userData ? (
        <Row>
          <Col xs={12}>
            {/* tabs */}
            <Tabs
              className="mb-2"
              activeTab={activeTab}
              toggleTab={toggleTab}
            />
            {/* pages */}
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AccountTabContent />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default AccountSettings;

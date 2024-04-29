import { Fragment, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import usePermission from "../../../hooks/use_permission";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Label,
  Row,
  Collapse,
  Col,
  Input,
  CardTitle,
  CardHeader,
} from "reactstrap";
import Skeleton from "../../../components/skeleton";
import CustomLoading from "../../../components/loading";
import {
  permissionSlice,
  setPermissionList,
} from "../../../redux/permission_slice";
import CollapseCard from "./components/collapse_card";

const AllPermissions = () => {
  const dispatch = useDispatch();
  const array = [1, 1, 1, 1, 1, 1];
  const {
    getPermissions,
    getRoles,
    roleData,
    roleTab,
    setRoleTab,
    loadings,
    getRolesLoading,
  } = usePermission();

  const permissionList = useSelector(
    (state) => state.permission.permissionList
  );

  const toggleTab = (tab) => {
    setRoleTab(tab);
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (roleTab) {
      getPermissions();
    }
  }, [roleTab]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="دسترسی کاربران"
        data={[{ title: "داشبورد" }, { title: "دسترسی کاربران" }]}
      />
      {/* tabs */}
      <Nav pills className="mb-2">
        {getRolesLoading
          ? array.map((item, index) => (
              <div key={index}>
                <Skeleton
                  style={{
                    width: 60,
                    height: 40,
                    borderRadius: 4,
                    margin: "0 8px",
                  }}
                />
              </div>
            ))
          : roleData.map((role, index) => (
              <NavItem key={index}>
                <NavLink
                  style={{
                    paddingRight: 8,
                    paddingLeft: 8,
                    marginLeft: 5,
                  }}
                  active={roleTab == role.value.toString()}
                  onClick={() => {
                    toggleTab(role.value.toString());
                  }}
                >
                  <span className="fw-bold">{role.label}</span>
                </NavLink>
              </NavItem>
            ))}
      </Nav>
      {/* loading */}
      {loadings.getPermissions ? <CustomLoading /> : null}
      {/* empty view */}
      {roleTab && !loadings.getPermissions && permissionList.length === 0 ? (
        <Card>
          <CardBody className="text-center">دسترسی ای یافت نشد.</CardBody>
        </Card>
      ) : null}
      {!loadings.getPermissions && permissionList.length > 0 ? (
        <Row>
          {permissionList.map((item, index) => (
            <Fragment key={index}>
              <CollapseCard item={item} />
            </Fragment>
          ))}
        </Row>
      ) : null}
    </Fragment>
  );
};
export default AllPermissions;

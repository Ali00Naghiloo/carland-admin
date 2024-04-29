import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useUsers from "../../../hooks/use_users";
import { useDispatch, useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";
import { Card, CardBody, Nav, NavItem, NavLink } from "reactstrap";
import Skeleton from "../../../components/skeleton";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import CustomLoading from "../../../components/loading";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import Select from "react-select";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import Confirm from "../../../components/confirm";
import Filterbar from "./components/filterbar";
import {
  setCurrentPage,
  setDeleteModal,
  setPerPage,
} from "../../../redux/users_slice";

const AllUsers = () => {
  const array = [1, 1, 1, 1];
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const {
    getUsers,
    deleteUser,
    getNationalities,
    getNationalityLoading,
    nationalityData,
    getRoles,
    getRolesLoading,
    roleTab,
    setRoleTab,
    roleData,
    filters,
    setFilters,
    loadings,
  } = useUsers();

  const datatableRef = useRef();

  const usersList = useSelector((state) => state.users.usersList);
  const currentPage = useSelector((state) => state.users.currentPage);
  const totalPage = useSelector((state) => state.users.totalPage);
  const perPage = useSelector((state) => state.users.perPage);
  const selectedEntity = useSelector((state) => state.users.selectedEntity);
  const deleteModal = useSelector((state) => state.users.deleteModal);

  const toggleTab = (tab) => {
    setRoleTab(tab);
  };

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getUsers && usersList?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage - 1}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page.selected + 1));
              getUsers(page.selected + 1, perPage);
            }}
            pageCount={totalPage}
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextClassName="page-item next-item"
            previousClassName="page-item prev-item"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
          />
          <div className="d-flex align-items-center">
            <CustomButton
              color="success"
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              خروجی اکسل کل صفحات
            </CustomButton>
            <CustomButton
              color="success"
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              خروجی اکسل این صفحه
            </CustomButton>
            <CustomButton
              color="danger"
              onClick={handlePrint}
              style={{ marginLeft: 8, height: 35, padding: "0 12px" }}
            >
              پرینت جدول
            </CustomButton>
            <Select
              isClearable={false}
              menuPlacement="top"
              theme={selectThemeColors}
              closeMenuOnSelect={true}
              placeholder="تعداد رکورد قابل نمایش"
              onChange={(value) => {
                dispatch(setPerPage(value));
                dispatch(setCurrentPage(1));
                getUsers(1, value, "without_filter");
              }}
              isSearchable={false}
              value={perPage}
              options={PaginationCountData}
              className={"react-select"}
              classNamePrefix="select"
              id="pagination_count"
              name="pagination_count"
            />
          </div>
        </div>
      ) : null}
    </>
  );

  useEffect(() => {
    getUsers(currentPage, perPage, "without_filter");
    getNationalities();
    getRoles();
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage(1));
    getUsers(1, perPage);
  }, [roleTab]);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="کاربران"
        data={[{ title: "داشبورد" }, { title: "کاربران" }]}
      />
      {/* filterbar */}
      <Filterbar
        filters={filters}
        setFilters={setFilters}
        getUsers={getUsers}
        getNationalityLoading={getNationalityLoading}
        nationalityData={nationalityData}
      />
      {/* tabs */}
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            style={{ paddingRight: 8, paddingLeft: 8, marginLeft: 5 }}
            active={roleTab === "0"}
            onClick={() => {
              toggleTab("0");
            }}
          >
            <span className="fw-bold">همه</span>
          </NavLink>
        </NavItem>
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
                  active={roleTab === role.value.toString()}
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
      {loadings.getUsers ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getUsers && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getUsers ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>کاربری یافت نشد.</div>
                )
              }
              noHeader
              pagination
              paginationPerPage={perPage.id}
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              paginationComponent={() => <></>}
              sortIcon={<ChevronDown size={10} />}
              data={usersList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getUsers && usersList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            کاربری یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این کاربر مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteUser}
        yesAction={() => deleteUser(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllUsers;

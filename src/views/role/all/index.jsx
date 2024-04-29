import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useRole from "../../../hooks/use_role";
import { Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import CustomLoading from "../../../components/loading";
import Confirm from "../../../components/confirm";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteModal } from "../../../redux/role_slice";
import TableLoading from "../../../components/table_loading";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";

const AllRole = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();
  const { getRoles, deleteRole, loadings } = useRole();

  const roleList = useSelector((state) => state.role.roleList);
  const deleteModal = useSelector((state) => state.role.deleteModal);
  const selectedEntity = useSelector((state) => state.role.selectedEntity);
  const patchLoading = useSelector((state) => state.role.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getRoles && roleList?.length > 0 ? (
        <div className="datatable_pagination_wrapper mt-1">
          <div></div>
          <div className="d-flex align-items-center">
            <CustomButton
              color="danger"
              onClick={handlePrint}
              style={{ height: 35, padding: "0 12px" }}
            >
              پرینت جدول
            </CustomButton>
          </div>
        </div>
      ) : null}
    </>
  );

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="نقش ها"
        data={[{ title: "داشبورد" }, { title: "نقش ها" }]}
      />
      {/* loading */}
      {loadings.getRoles ? <CustomLoading /> : null}
      {/* datatable */}
      {!loadings.getRoles && (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getRoles ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>نقشی یافت نشد.</div>
                )
              }
              noHeader
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              paginationComponent={() => <></>}
              sortIcon={<ChevronDown size={10} />}
              data={roleList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!loadings.getRoles && roleList.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            نقشی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این نقش مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteRole}
        yesAction={() => deleteRole(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllRole;

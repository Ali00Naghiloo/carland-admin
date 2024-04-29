import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useOperator from "../../../hooks/use_operator";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import { columns } from "./datatable/index";
import CustomLoading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteModal } from "../../../redux/operator_slice";
import { useReactToPrint } from "react-to-print";
import Confirm from "../../../components/confirm";
import CustomButton from "../../../components/button";
import TableLoading from "../../../components/table_loading";

const AllOperator = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const { getOperators, deleteOperator, loadings } = useOperator();

  const datatableRef = useRef();

  const operatorList = useSelector((state) => state.operator.operatorList);
  const deleteModal = useSelector((state) => state.operator.deleteModal);
  const selectedEntity = useSelector((state) => state.operator.selectedEntity);
  const patchLoading = useSelector((state) => state.operator.patchLoading);

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getOperators && operatorList?.length > 0 ? (
        <div className="datatable_pagination_wrapper mt-1">
          <div></div>
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
    getOperators();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="اپراتور ها"
        data={[{ title: "داشبورد" }, { title: "اپراتور ها" }]}
      />
      {/* datatable */}
      {!loadings.getOperators ? (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getOperators ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>اپراتوری یافت نشد.</div>
                )
              }
              noHeader
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              sortIcon={<ChevronDown size={10} />}
              data={operatorList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
            {/* patch loading */}
            {patchLoading ? <TableLoading /> : null}
          </div>
          <CustomPagination />
        </>
      ) : null}
      {/* loading */}
      {loadings.getOperators ? <CustomLoading /> : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این اپراتور مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteOperator}
        yesAction={() => deleteOperator(selectedEntity)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllOperator;

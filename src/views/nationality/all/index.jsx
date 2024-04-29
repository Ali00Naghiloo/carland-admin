import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useNationality from "../../../hooks/use_nationality";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import { columns } from "./datatable/index";
import CustomLoading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteModal } from "../../../redux/nationality_slice";
import { useReactToPrint } from "react-to-print";
import Confirm from "../../../components/confirm";
import CustomButton from "../../../components/button";

const AllNationality = () => {
  const { getNationalities, deleteNationality, loadings } = useNationality();

  const dispatch = useDispatch();
  const { skin } = useSkin();

  const datatableRef = useRef();

  const nationalityList = useSelector(
    (state) => state.nationality.nationalityList
  );
  const deleteModal = useSelector((state) => state.nationality.deleteModal);
  const selectedEntity = useSelector(
    (state) => state.nationality.selectedEntity
  );

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getNationalities && nationalityList?.length > 0 ? (
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
    getNationalities();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ملیت ها"
        data={[{ title: "داشبورد" }, { title: "ملیت ها" }]}
      />
      {/* datatable */}
      {!loadings.getNationalities ? (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getNationalities ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>ملیتی یافت نشد.</div>
                )
              }
              noHeader
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              sortIcon={<ChevronDown size={10} />}
              data={nationalityList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      ) : null}
      {/* loading */}
      {loadings.getNationalities ? <CustomLoading /> : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این ملیت مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteNationality}
        yesAction={() => deleteNationality(selectedEntity?.id)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllNationality;

import { Fragment, useEffect, useRef } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import useNumberLabel from "../../../hooks/use_number_label";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import { columns } from "./datatable/index";
import CustomLoading from "../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteModal } from "../../../redux/number_label_slice";
import { useReactToPrint } from "react-to-print";
import Confirm from "../../../components/confirm";
import CustomButton from "../../../components/button";

const AllNumberLabel = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const { getNumberLabels, deleteNumberLabel, numberLabelsList, loadings } =
    useNumberLabel();
  const datatableRef = useRef();

  const deleteModal = useSelector((state) => state.numberLabel.deleteModal);
  const selectedEntity = useSelector(
    (state) => state.numberLabel.selectedEntity
  );

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getNumberLabels && numberLabelsList?.length > 0 ? (
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
    getNumberLabels();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="برچسب های سیمکارت"
        data={[{ title: "داشبورد" }, { title: "برچسب های سیمکارت" }]}
      />
      {/* datatable */}
      {!loadings.getNumberLabels ? (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getNumberLabels ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>
                    برچسب سیمکارتی یافت نشد.
                  </div>
                )
              }
              noHeader
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              sortIcon={<ChevronDown size={10} />}
              data={numberLabelsList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      ) : null}
      {/* loading */}
      {loadings.getNumberLabels ? <CustomLoading /> : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این برچسب سیمکارت مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteNumberLabel}
        yesAction={() => deleteNumberLabel(selectedEntity?.id)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};
export default AllNumberLabel;

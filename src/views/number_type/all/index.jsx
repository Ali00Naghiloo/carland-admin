import { Fragment, useRef, useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import CustomLoading from "../../../components/loading";
import useNumberType from "../../../hooks/use_number_type";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import { columns } from "./datatable/index";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import Confirm from "../../../components/confirm";
import { setDeleteModal } from "../../../redux/number_type_slice";

const AllNumberType = () => {
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const { getNumberTypes, deleteNumberType, numberTypesList, loadings } =
    useNumberType();
  const datatableRef = useRef();

  const deleteModal = useSelector((state) => state.numberType.deleteModal);
  const selectedEntity = useSelector(
    (state) => state.numberType.selectedEntity
  );

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!loadings.getNumberTypes && numberTypesList?.length > 0 ? (
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
    getNumberTypes();
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="انواع سیمکارت"
        data={[{ title: "داشبورد" }, { title: "انواع سیمکارت" }]}
      />
      {/* datatable */}
      {!loadings.getNumberTypes ? (
        <>
          <div className="position-relative" ref={datatableRef}>
            <DataTable
              noDataComponent={
                !loadings.getNumberTypes ? (
                  ""
                ) : (
                  <div style={{ margin: "24px 0" }}>نوع سیمکارتی یافت نشد.</div>
                )
              }
              noHeader
              columns={columns}
              className="react-dataTable"
              style={{ background: "red" }}
              sortIcon={<ChevronDown size={10} />}
              data={numberTypesList}
              theme={skin === "dark" ? "darkTheme" : ""}
            />
          </div>
          <CustomPagination />
        </>
      ) : null}
      {/* loading */}
      {loadings.getNumberTypes ? <CustomLoading /> : null}
      {/* delete modal */}
      <Confirm
        visible={deleteModal}
        setVisible={setDeleteModal}
        title={"آیا از حدف این نوع شماره مطمئن هستید؟"}
        noAction={() => dispatch(setDeleteModal(null))}
        noColor={"secondary"}
        noTitle={"انصراف"}
        yesLoading={loadings.deleteNumberType}
        yesAction={() => deleteNumberType(selectedEntity?.id)}
        yesColor={"danger"}
        yesTitle={"تایید و حذف"}
        type={"global"}
      />
    </Fragment>
  );
};

export default AllNumberType;

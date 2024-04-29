import { Fragment, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import { useSearchParams, useNavigate } from "react-router-dom";
import useFinance from "../../../hooks/use_finance";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import formatHelper from "../../../helper/format_helper";
import Skeleton from "../../../components/skeleton";
import CustomLoading from "../../../components/loading";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useSkin } from "@hooks/useSkin";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { columns } from "./datatable";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setTransactionModal,
  setTransactionsCurrentPage,
  setTransactionsPerPage,
} from "../../../redux/finance_slice";
import { PaginationCountData } from "../../../utility/data/pagination_count";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../../components/button";
import CustomModal from "../../../components/modal";
import moment from "jalali-moment";

const ViewFinance = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { skin } = useSkin();
  const datatableRef = useRef();

  const [appUserId, setAppUserId] = useState(null);

  const {
    getWalletStatus,
    getTransactions,
    walletStatusData,
    transactions,
    loadings,
    transactionsLoading,
  } = useFinance();

  const transactionsCurrentPage = useSelector(
    (state) => state.finance.transactionsCurrentPage
  );
  const transactionsPerPage = useSelector(
    (state) => state.finance.transactionsPerPage
  );
  const transactionsTotalPage = useSelector(
    (state) => state.finance.transactionsTotalPage
  );
  const transactionModal = useSelector(
    (state) => state.finance.transactionModal
  );
  const selectedTransaction = useSelector(
    (state) => state.finance.selectedTransaction
  );

  // print datatable
  const handlePrint = useReactToPrint({
    content: () => datatableRef.current,
  });

  // ** Custom Pagination
  const CustomPagination = () => (
    <>
      {!transactionsLoading && transactions?.length > 0 ? (
        <div className="datatable_pagination_wrapper">
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={transactionsCurrentPage - 1}
            onPageChange={(page) => {
              dispatch(setTransactionsCurrentPage(page.selected + 1));
              getTransactions(
                page.selected + 1,
                transactionsPerPage,
                appUserId
              );
            }}
            pageCount={transactionsTotalPage}
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
            {/* grade */}
            <Select
              isClearable={false}
              menuPlacement="top"
              theme={selectThemeColors}
              closeMenuOnSelect={true}
              isSearchable={false}
              placeholder="تعداد رکورد قابل نمایش"
              onChange={(value) => {
                dispatch(setTransactionsPerPage(value));
                dispatch(setTransactionsCurrentPage(1));
                getTransactions(1, value, appUserId);
              }}
              value={transactionsPerPage}
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
    let entity_id = searchParams.get("entity_id");
    dispatch(setTransactionsCurrentPage(1));
    dispatch(
      setTransactionsPerPage({
        id: "25",
        label: "۲۵",
        value: "۲۵",
      })
    );
    if (entity_id) {
      setAppUserId(entity_id);
      getWalletStatus(entity_id);
      getTransactions(transactionsCurrentPage, transactionsPerPage, entity_id);
    } else {
      navigate("/finance/all");
    }
  }, []);

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="جزییات مالی"
        data={[{ title: "داشبورد" }, { title: "جزییات مالی" }]}
      />
      {/* status bar */}
      <Row>
        {/* sum wallet */}
        <Col xs="12" sm="6" className="mb-1">
          <Card className="m-0">
            {loadings.getWalletStatus ? (
              <CardHeader>
                <Skeleton style={{ width: 120, height: 32, borderRadius: 8 }} />
                <Skeleton style={{ width: 120, height: 30, borderRadius: 8 }} />
              </CardHeader>
            ) : (
              <CardHeader>
                <CardTitle>موجودی کیف پول</CardTitle>
                <div className="d-flex align-items-center">
                  <div
                    style={
                      walletStatusData?.sumWallet > 0
                        ? { color: "green", fontSize: 24 }
                        : { fontSize: 24 }
                    }
                  >
                    {walletStatusData?.sumWallet
                      ? formatHelper.toPersianString(
                          formatHelper.numberSeperator(
                            walletStatusData.sumWallet
                          )
                        )
                      : "۰"}
                  </div>

                  <small style={{ padding: "0 5px" }}>تومان</small>
                </div>
              </CardHeader>
            )}
          </Card>
        </Col>
        {/* sum commision */}
        <Col xs="12" sm="6" className="mb-1">
          <Card className="m-0">
            {loadings.getWalletStatus ? (
              <CardHeader>
                <Skeleton style={{ width: 120, height: 32, borderRadius: 8 }} />
                <Skeleton style={{ width: 120, height: 30, borderRadius: 8 }} />
              </CardHeader>
            ) : (
              <CardHeader>
                <CardTitle>مجموع کمیسیون ها</CardTitle>
                <div className="d-flex align-items-center">
                  <div
                    style={
                      walletStatusData?.sumCommission > 0
                        ? { color: "green", fontSize: 24 }
                        : { fontSize: 24 }
                    }
                  >
                    {walletStatusData?.sumCommission
                      ? formatHelper.toPersianString(
                          formatHelper.numberSeperator(
                            walletStatusData.sumCommission
                          )
                        )
                      : "۰"}
                  </div>

                  <small style={{ padding: "0 5px" }}>تومان</small>
                </div>
              </CardHeader>
            )}
          </Card>
        </Col>
      </Row>
      {/* table loading */}
      {transactionsLoading ? <CustomLoading /> : null}
      {/* datatable */}
      {!transactionsLoading && (
        <>
          <Card className="m-0">
            <CardHeader>
              <CardTitle>تراکنش ها</CardTitle>
            </CardHeader>
            <div className="position-relative" ref={datatableRef}>
              <DataTable
                noDataComponent={
                  !transactionsLoading ? (
                    ""
                  ) : (
                    <div style={{ margin: "24px 0" }}>تراکنشی یافت نشد.</div>
                  )
                }
                noHeader
                pagination
                paginationPerPage={transactionsPerPage.id}
                columns={columns}
                className="react-dataTable"
                style={{ background: "red" }}
                paginationComponent={() => <></>}
                sortIcon={<ChevronDown size={10} />}
                data={transactions}
                theme={skin === "dark" ? "darkTheme" : ""}
              />
            </div>
          </Card>
          <CustomPagination />
        </>
      )}
      {/* empty view */}
      {!transactionsLoading && transactions.length === 0 ? (
        <Card>
          <CardBody className="d-flex justify-content-center">
            تراکنشی یافت نشد.
          </CardBody>
        </Card>
      ) : null}
      {/* detail modal */}
      <CustomModal
        visible={transactionModal}
        setVisible={setTransactionModal}
        title="جزییات تراکنش"
        type={"global"}
        size="lg"
        actionHandler={() => dispatch(setTransactionModal(null))}
        actionTitle="بستن"
        actionColor="primary"
      >
        <Row>
          {/* typeTransaction */}
          <Col xs="12" sm="6" md="4" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>نوع تراکنش :</div>
            <div style={{ marginRight: 5, fontSize: 14, fontWeight: 900 }}>
              {selectedTransaction?.typeTransaction}
            </div>
          </Col>
          {/* firstName lastName */}
          <Col xs="12" sm="6" md="4" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>نام و نام خانوادگی :</div>
            <div style={{ marginRight: 5, fontSize: 14, fontWeight: 900 }}>
              {selectedTransaction?.appUser?.firstName}{" "}
              {selectedTransaction?.appUser?.lastName}
            </div>
          </Col>
          {/* credit */}
          <Col xs="12" sm="6" md="4" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>واریز :</div>
            <div
              style={{ marginRight: 5, fontSize: 14, fontWeight: 900 }}
              className={selectedTransaction?.credit ? "text-success" : ""}
            >
              {selectedTransaction?.credit
                ? formatHelper.toPersianString(
                    formatHelper.numberSeperator(selectedTransaction.credit)
                  ) + " تومان"
                : "---"}
            </div>
          </Col>
          {/* debt */}
          <Col xs="12" sm="6" md="4" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>برداشت :</div>
            <div
              style={{ marginRight: 5, fontSize: 14, fontWeight: 900 }}
              className={selectedTransaction?.debt ? "text-danger" : ""}
            >
              {selectedTransaction?.debt
                ? formatHelper.toPersianString(
                    formatHelper.numberSeperator(selectedTransaction.debt)
                  ) + " تومان"
                : "---"}
            </div>
          </Col>
          {/* dateTimeTransaction */}
          <Col xs="12" sm="6" md="4" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>تاریخ تراکنش :</div>
            <div
              style={{
                marginRight: 5,
                fontSize: 14,
                fontWeight: 900,
                direction: "ltr",
              }}
            >
              {selectedTransaction?.dateTimeTransaction
                ? formatHelper.toPersianString(
                    moment(selectedTransaction.dateTimeTransaction)
                      .locale("fa")
                      .format("YYYY/MM/DD HH:mm:ss")
                  )
                : "---"}
            </div>
          </Col>
          {/* description */}
          <Col xs="12" className="mb-1 d-flex align-items-center">
            <div style={{ fontSize: 12 }}>توضیحات :</div>
            <div
              style={{
                marginRight: 5,
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              {selectedTransaction?.description
                ? selectedTransaction?.description
                : "---"}
            </div>
          </Col>
        </Row>
      </CustomModal>
    </Fragment>
  );
};
export default ViewFinance;

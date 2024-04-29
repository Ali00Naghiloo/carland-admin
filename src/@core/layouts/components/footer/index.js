// ** Icons Import
import version from "../../../../constant/version.json";
import formatHelper from "../../../../helper/format_helper";

const Footer = () => {
  return (
    <div className="mb-0 d-flex justify-content-between mv_footer">
      <span className="mt-25">
        کپی رایت © {formatHelper.toPersianString(new Date().getFullYear())} شرکت
        ارتباطی خدمات اول
      </span>
      <span>نسخه {formatHelper.toPersianString(version.app_version)}</span>
    </div>
  );
};

export default Footer;

import * as yup from "yup";

export const getTokenSchema = yup.object({
  username: yup.string().required("فیلد نام کاربری اجباری است."),
  password: yup.string().required("فیلد رمز عبور اجباری است."),
});

export const createProviderSchema = yup.object({
  agent_name: yup.string().required("فیلد نام نمایندگی اجباری است."),
  grade: yup.object().required("فیلد درجه نمایندگی اجباری است."),
  agent_phone: yup.string().required("فیلد شماره تماس نمایندگی اجباری است."),
  province_id: yup.object().required("فیلد استان نمایندگی اجباری است."),
  city_id: yup.object().required("فیلد شهر نمایندگی اجباری است."),
  postal_code: yup.string().required("فیلد کد پستی نمایندگی اجباری است."),
  address: yup.string().required("فیلد آدرس نمایندگی اجباری است."),
  national_id: yup.string().required("فیلد کد ملی اجباری است."),
  birth_certificate_id: yup
    .string()
    .required("فیلد شماره شناسنامه اجباری است."),
  birthday_date: yup.object().required("فیلد تاریخ تولد اجباری است."),
  father_name: yup.string().required("فیلد نام پدر اجباری است."),
  national_id_location: yup
    .object()
    .required("فیلد محل صدور شناسنامه اجباری است."),
});

export const updateProviderSchema = yup.object({
  agent_name: yup.string().required("فیلد نام نمایندگی اجباری است."),
  grade: yup.object().required("فیلد درجه نمایندگی اجباری است."),
  agent_phone: yup.string().required("فیلد شماره تماس نمایندگی اجباری است."),
  province_id: yup.object().required("فیلد استان نمایندگی اجباری است."),
  city_id: yup.object().required("فیلد شهر نمایندگی اجباری است."),
  postal_code: yup.string().required("فیلد کد پستی نمایندگی اجباری است."),
  address: yup.string().required("فیلد آدرس نمایندگی اجباری است."),
  national_id: yup.string().required("فیلد کد ملی اجباری است."),
  birth_certificate_id: yup
    .string()
    .required("فیلد شماره شناسنامه اجباری است."),
  birthday_date: yup.object().required("فیلد تاریخ تولد اجباری است."),
  father_name: yup.string().required("فیلد نام پدر اجباری است."),
  national_id_location: yup
    .object()
    .required("فیلد محل صدور شناسنامه اجباری است."),
});

export const createPersonnelSchema = yup.object({
  users_name: yup.string().required("فیلد نام اجباری است."),
  users_family: yup.string().required("فیلد نام خانوادگی اجباری است."),
  users_phone: yup.string().required("فیلد شماره تماس اجباری است."),
  nationale_code: yup.string().required("فیلد کد ملی اجباری است."),
  roles_ids: yup.object().required("فیلد نقش اجباری است."),
  city_id: yup.object().required("فیلد شهر اجباری است."),
  employee_date: yup.object().required("فیلد تاریخ استخدام اجباری است."),
  password: yup.string().required("فیلد رمز عبور اجباری است."),
});

export const updatePersonnelSchema = yup.object({
  users_name: yup.string().required("فیلد نام اجباری است."),
  users_family: yup.string().required("فیلد نام خانوادگی اجباری است."),
  users_phone: yup.string().required("فیلد شماره تماس اجباری است."),
  nationale_code: yup.string().required("فیلد کد ملی اجباری است."),
  roles_ids: yup.object().required("فیلد نقش اجباری است."),
  city_id: yup.object().required("فیلد شهر اجباری است."),
  employee_date: yup.object().required("فیلد تاریخ استخدام اجباری است."),
  password: yup.string().required("فیلد رمز عبور اجباری است."),
});

export const createCategorySchema = yup.object({
  name: yup.string().required("فیلد نام دسته بندی اجباری است."),
});

export const createSliderSchema = yup.object({
  name: yup.string().required("فیلد نام اسلایدر اجباری است."),
  link: yup.string().required("فیلد لینک اسلایدر اجباری است."),
  image: yup.string().required("فیلد تصویر دسکتاپ اجباری است."),
  mobileImage: yup.string().required("فیلد تصویر موبایل اجباری است."),
});

export const createOperatorSchema = yup.object({
  name: yup.string().required("فیلد نام اپراتور اجباری است."),
  digit: yup.string().required("فیلد تعداد ارقام سریال سیمکارت اجباری است."),
});

export const createNumberLabelSchema = yup.object({
  name: yup.string().required("فیلد نام برچسب سیمکارت اجباری است."),
});

export const createSourceNumberSchema = yup.object({
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  typeNumberId: yup.object().required("فیلد نوع سیمکارت اجباری است."),
  labelNumberId: yup.object().required("فیلد برچسب سیمکارت اجباری است."),
  planId: yup.object().required("فیلد طرح اجباری است."),
  categoryId: yup.object().required("فیلد دسته بندی اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const updateSourceNumberSchema = yup.object({
  number: yup
    .string()
    .required("فیلد شماره تلفن اجباری است.")
    .length(11, "شماره تلفن باید ۱۱ رقم باشد."),
  labelShowNumber: yup.string().required("فیلد فرمت نمایش اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  typeNumberId: yup.object().required("فیلد نوع سیمکارت اجباری است."),
  labelNumberId: yup.object().required("فیلد برچسب سیمکارت اجباری است."),
  planId: yup.object().required("فیلد طرح اجباری است."),
  categoryId: yup.object().required("فیلد دسته بندی اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const simpleSearchSchema = yup.object({
  Number: yup.string().required("فیلد شماره تلفن اجباری است."),
});

export const createGradeSchema = yup.object({
  name: yup.string().required("فیلد نام گرید اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  score: yup.string().required("فیلد امتیاز اجباری است."),
});

export const createOfferSchema = yup.object({
  offerName: yup.string().required("فیلد نام تخفیف اجباری است."),
  offerCode: yup.string().required("فیلد کد تخفیف اجباری است."),
  offerValue: yup.string().required("فیلد مقدار تخفیف اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  startDate: yup.object().required("فیلد تاریخ شروع اجباری است."),
  endDate: yup.object().required("فیلد تاریخ پایان اجباری است."),
});

export const createPlanSchema = yup.object({
  name: yup.string().required("فیلد نام طرح اجباری است."),
  summray: yup.string().required("فیلد خلاصه طرح اجباری است."),
  description: yup.string().required("فیلد توضیحات طرح اجباری است."),
  categoryId: yup.object().required("فیلد دسته بندی اجباری است."),
  opratorId: yup.object().required("فیلد اپراتور اجباری است."),
  countStar: yup.string().required("فیلد تعداد ستاره های طرح اجباری است."),
});

export const createNationalitySchema = yup.object({
  nationalityName: yup.string().required("فیلد نام ملیت اجباری است."),
});

export const createRoleSchema = yup.object({
  name: yup.string().required("فیلد نام نقش اجباری است."),
});

export const createUserSchema = yup.object({
  RoleId: yup.object().required("فیلد نقش کاربر اجباری است."),
  NationalityId: yup.object().required("فیلد ملیت کاربر اجباری است."),
  NationalCode: yup.string().required("فیلد کد ملی اجباری است."),
  PhoneNumber: yup.string().required("فیلد شماره موبایل اجباری است."),
  Birthdate: yup.object().required("فیلد تاریخ تولد اجباری است."),
});

export const verifyUserMobileSchema = yup.object({
  SmsCode: yup.string().required("فیلد کد تایید اجباری است."),
});

export const createUserWithoutMobileSchema = yup.object({
  RoleId: yup.object().required("فیلد نقش کاربر اجباری است."),
  NationalityId: yup.object().required("فیلد ملیت کاربر اجباری است."),
  NationalCode: yup.string().required("فیلد کد ملی اجباری است."),
  Birthdate: yup.object().required("فیلد تاریخ تولد اجباری است."),
});

export const updateUserSchema = yup.object({
  nationalityId: yup.object().required("فیلد ملیت کاربر اجباری است."),
  roleId: yup.object().required("فیلد نقش کاربر اجباری است."),
  birthDate: yup.object().required("فیلد تاریخ تولد اجباری است."),
  firstName: yup.string().required("فیلد نام اجباری است."),
  lastName: yup.string().required("فیلد نام خانوادگی اجباری است."),
});

export const createModemPackageSchema = yup.object({
  namepacket: yup.string().required("فیلد نام بسته اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  typeInternet: yup.object().required("فیلد نوع بسته اجباری است."),
  price: yup.string().required("فیلد قیمت بسته اجباری است."),
  packetTime: yup.object().required("فیلد تاریخ اعتبار اجباری است."),
});

export const createProductSchema = yup.object({
  name: yup.string().required("فیلد نام محصول اجباری است."),
  stockSite: yup.string().required("فیلد تعداد برای سایت اجباری است."),
  stockAgent: yup.string().required("فیلد تعداد برای نمایندگان اجباری است."),
  categoryId: yup.object().required("فیلد دسته بندی اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  priceseller: yup.string().required("فیلد قیمت نمایندگان اجباری است."),
  priceBuy: yup.string().required("فیلد قیمت خرید اجباری است."),
});

export const createServiceSchema = yup.object({
  name: yup.string().required("فیلد نام محصول اجباری است."),
  categoryId: yup.object().required("فیلد دسته بندی اجباری است."),
  opratorTableId: yup.object().required("فیلد اپراتور اجباری است."),
  creditPrice: yup.string().required("فیلد قیمت اعتباری اجباری است."),
  fixedPrice: yup.string().required("فیلد قیمت دائمی اجباری است."),
});

export const createCommisionSchema = yup.object({
  gradeId: yup.object().required("فیلد گرید اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  price: yup.string().required("فیلد مبلغ کمیسیون اجباری است."),
});

export const updateCommisionSchema = yup.object({
  price: yup.string().required("فیلد مبلغ کمیسیون اجباری است."),
});

export const createSimcardNaveSchema = yup.object({
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  serial: yup.string().required("فیلد سریال سیمکارت اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const createMultiSimcardNaveSchema = yup.object({
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  startNumberSerial: yup.string().required("فیلد شروع سریال اجباری است."),
  endNumberSerial: yup.string().required("فیلد پایان سریال اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const createSimcardNumberSchema = yup.object({
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  typeId: yup.object().required("فیلد نوع سیمکارت اجباری است."),
  labelNumberId: yup.object().required("فیلد برچسب سیمکارت اجباری است."),
  planId: yup.object().required("فیلد طرح اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const updateSimcardNumberSchema = yup.object({
  number: yup
    .string()
    .required("فیلد شماره تلفن اجباری است.")
    .length(11, "شماره تلفن باید ۱۱ رقم باشد."),
  serial: yup.string().required("فیلد سریال سیمکارت اجباری است."),
  showLabelNumber: yup.string().required("فیلد فرمت نمایش اجباری است."),
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  typeId: yup.object().required("فیلد نوع سیمکارت اجباری است."),
  labelNumberId: yup.object().required("فیلد برچسب سیمکارت اجباری است."),
  planId: yup.object().required("فیلد طرح اجباری است."),
  price: yup.string().required("فیلد قیمت اجباری است."),
});

export const createScheduleSchema = yup.object({
  satrtTime: yup.object().required("فیلد زمان شروع اجباری است."),
  endTime: yup.object().required("فیلد زمان پایان اجباری است."),
  monthnumber: yup.object().required("فیلد ماه اجباری است."),
});

export const createDeliverySchema = yup.object({
  provincesId: yup.object().required("فیلد استان اجباری است."),
  citiesId: yup.object().required("فیلد شهر اجباری است."),
  price: yup.string().required("فیلد هزینه ی ارسال اجباری است."),
});

export const createZoneSchema = yup.object({
  roleId: yup.object().required("فیلد نقش اجباری است."),
  userAgentId: yup.object().required("فیلد نماینده اجباری است."),
});

export const updateZoneSchema = yup.object({
  zipCode: yup.string().required("فیلد سه رقم کد پستی اجباری است."),
});

export const assignOfferSchema = yup.object({
  offerId: yup.object().required("فیلد تخفیف اجباری است."),
});

export const createScoreSchema = yup.object({
  operatorId: yup.object().required("فیلد اپراتور اجباری است."),
  score: yup.string().required("فیلد امتیاز اجباری است."),
});

export const updateSmsSchema = yup.object({
  title: yup.string().required("فیلد عنوان پیامک اجباری است."),
  contextBody: yup.string().required("فیلد متن پیامک اجباری است."),
});

export const createPermissionSchema = yup.object({
  roleId: yup.object().required("فیلد نقش کاربر اجباری است."),
  permissionDatas: yup
    .array()
    .min(1, "انتخاب حداقل یک نقش اجباری است.")
    .required("انتخاب حداقل یک نقش اجباری است."),
});

export const createAdminSchema = yup.object({
  phoneNumber: yup.string().required("فیلد شماره موبایل اجباری است."),
  roleId: yup.object().required("فیلد نقش اجباری است."),
  password: yup.string().required("فیلد رمز عبور اجباری است."),
  confirmPassword: yup.string().required("فیلد تکرار رمز عبور اجباری است."),
  email: yup
    .string()
    .required("فیلد ایمیل اجباری است.")
    .email("فرمت ایمیل وارد شده اشتباه است."),
  name: yup.string().required("فیلد نام اجباری است."),
  family: yup.string().required("فیلد نام خانوادگی اجباری است."),
});

export const updateAdminSchema = yup.object({
  phoneNumber: yup.string().required("فیلد شماره موبایل اجباری است."),
  roleId: yup.object().required("فیلد نقش اجباری است."),
  email: yup
    .string()
    .required("فیلد ایمیل اجباری است.")
    .email("فرمت ایمیل وارد شده اشتباه است."),
  name: yup.string().required("فیلد نام اجباری است."),
  family: yup.string().required("فیلد نام خانوادگی اجباری است."),
});

export const createVideoSchema = yup.object({
  title: yup.string().required("فیلد عنوان ویدیو اجباری است."),
  link: yup.string().required("فیلد فایل ویدیو اجباری است."),
});

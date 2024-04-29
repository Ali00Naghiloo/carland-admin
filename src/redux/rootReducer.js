// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import user from "./user_slice";
import app from "./app_slice";
import provider from "./provider_slice";
import personnel from "./personnel_slice";
import category from "./category_slice";
import sliders from "./sliders_slice";
import operator from "./operator_slice";
import grade from "./grade_slice";
import numberType from "./number_type_slice";
import numberLabel from "./number_label_slice";
import plan from "./plan_slice";
import sourceNumber from "./source_number_slice";
import offer from "./offer_slice";
import modemPackage from "./modem_package_slice";
import product from "./product_slice";
import service from "./service_slice";
import nationality from "./nationality_slice";
import role from "./role_slice";
import users from "./users_slice";
import commision from "./commision_slice";
import simcardNave from "./simcard_nave_slice";
import simcardNumber from "./simcard_number_slice";
import schedule from "./schedule_slice";
import delivery from "./delivery_slice";
import zones from "./zones_slice";
import sms from "./sms_slice";
import permission from "./permission_slice";
import admin from "./admin_slice";
import finance from "./finance_slice";
import videos from "./videos_slice";

const rootReducer = {
  user,
  app,
  navbar,
  layout,
  provider,
  personnel,
  category,
  sliders,
  operator,
  grade,
  numberType,
  numberLabel,
  plan,
  sourceNumber,
  offer,
  modemPackage,
  product,
  service,
  nationality,
  role,
  users,
  commision,
  simcardNave,
  simcardNumber,
  schedule,
  delivery,
  zones,
  sms,
  permission,
  admin,
  finance,
  videos,
};

export default rootReducer;

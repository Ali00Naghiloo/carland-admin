// ** Navigation imports
import dashboards from "./dashboards";
import category from "./category";
import sliders from "./sliders";
import operator from "./operator";
import grade from "./grade";
import number_type from "./number_type";
import number_label from "./number_label";
import plan from "./plan";
import source_number from "./source_number";
import modem_package from "./modem_package";
import product from "./product";
import service from "./service";
import offer from "./offer";
import nationality from "./nationality";
import role from "./role";
import users from "./users";
import commision from "./commision";
import simcard from "./simcard";
import schedule from "./schedule";
import delivery from "./delivery";
import zones from "./zones";
import scores from "./scores";
import sms from "./sms";
import orders from "./orders";
import permission from "./permission";
import admin from "./admin";
import finance from "./finance";
import videos from "./videos";

// ** Merge & Export
export default [
  ...dashboards,
  ...orders,
  ...simcard,
  ...source_number,
  ...product,
  ...service,
  ...modem_package,
  ...users,
  ...finance,
  ...permission,
  ...role,
  ...nationality,
  ...category,
  ...operator,
  ...grade,
  ...number_type,
  ...number_label,
  ...plan,
  ...commision,
  ...offer,
  ...delivery,
  ...schedule,
  ...zones,
  ...scores,
  ...admin,
  ...sliders,
  ...videos,
  ...sms,
];

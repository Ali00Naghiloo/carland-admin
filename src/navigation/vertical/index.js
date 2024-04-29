// ** Navigation imports
import dashboards from "./dashboards";
import users from "./users";
import ads from "./ads";
import clubs from "./clubs";
import magazines from "./magazines";
import assistances from "./assistances";
import tickets from "./tickets";
import admin_control from "./admins_control";

// ** Merge & Export
export default [
  ...dashboards,
  ...users,
  ...ads,
  ...clubs,
  ...magazines,
  ...assistances,
  ...tickets,
  ...admin_control,
];

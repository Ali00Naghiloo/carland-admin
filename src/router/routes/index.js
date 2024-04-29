// ** React Imports
import { Fragment } from "react";

// ** Routes Imports
import PagesRoutes from "./Pages";
import DashboardRoutes from "./Dashboards";
import AuthenticationRoutes from "./Authentication";
import CtageoryRoutes from "./category";
import SlidersRoutes from "./sliders";
import ProductRoutes from "./product";
import OperatorRoutes from "./operator";
import NumberLabelRoutes from "./number_label";
import SourceNumberRoutes from "./source_number";
import ServiceRoutes from "./service";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRoute from "@components/routes/PrivateRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import ModemPackageRoutes from "./modem_package";
import GradeRoutes from "./grade";
import OfferRoutes from "./offer";
import NumberTypeRoutes from "./number_type";
import PlanRoutes from "./plan";
import NationalityRoutes from "./nationality";
import RoleRoutes from "./role";
import UsersRoutes from "./users";
import CommisionRoutes from "./commision";
import SimcardRoutes from "./simcard";
import ScheduleRoutes from "./schedule";
import DeliveryRoutes from "./delivery";
import ZonesRoutes from "./zones";
import ScoresRoutes from "./scores";
import SmsRoutes from "./sms";
import OrderRoutes from "./orders";
import PermissionRoutes from "./permission";
import AdminRoutes from "./admin";
import FinanceRoutes from "./finance";
import VideosRoutes from "./videos";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...PagesRoutes,
  ...CtageoryRoutes,
  ...SlidersRoutes,
  ...ProductRoutes,
  ...OperatorRoutes,
  ...NumberTypeRoutes,
  ...NumberLabelRoutes,
  ...PlanRoutes,
  ...SourceNumberRoutes,
  ...OfferRoutes,
  ...ModemPackageRoutes,
  ...GradeRoutes,
  ...NationalityRoutes,
  ...RoleRoutes,
  ...UsersRoutes,
  ...ServiceRoutes,
  ...CommisionRoutes,
  ...SimcardRoutes,
  ...ScheduleRoutes,
  ...DeliveryRoutes,
  ...ZonesRoutes,
  ...ScoresRoutes,
  ...SmsRoutes,
  ...OrderRoutes,
  ...PermissionRoutes,
  ...AdminRoutes,
  ...FinanceRoutes,
  ...VideosRoutes,
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute;
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };

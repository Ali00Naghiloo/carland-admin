import { lazy } from "react";

const AllModemPackages = lazy(() =>
  import("../../views/modem_package/all/index")
);
const CreateModemPackage = lazy(() =>
  import("../../views/modem_package/create/index")
);
const UpdateModemPackage = lazy(() =>
  import("../../views/modem_package/update/index")
);

const ModemPackageRoutes = [
  {
    path: "/modem_package/all",
    element: <AllModemPackages />,
  },
  {
    path: "/modem_package/new",
    element: <CreateModemPackage />,
  },
  {
    path: "/modem_package/update",
    element: <UpdateModemPackage />,
  },
];

export default ModemPackageRoutes;

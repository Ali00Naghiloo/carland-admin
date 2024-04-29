import { lazy } from "react";

const AllPermissions = lazy(() => import("../../views/permission/all/index"));
const CreatePermission = lazy(() =>
  import("../../views/permission/create/index")
);
const UpdatePermission = lazy(() =>
  import("../../views/permission/update/index")
);

const PermissionRoutes = [
  {
    path: "/permission/all",
    element: <AllPermissions />,
  },
  {
    path: "/permission/new",
    element: <CreatePermission />,
  },
  {
    path: "/permission/update",
    element: <UpdatePermission />,
  },
];

export default PermissionRoutes;

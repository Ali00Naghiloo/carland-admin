import { lazy } from "react";

const AllNationality = lazy(() => import("../../views/nationality/all/index"));
const CreateNationality = lazy(() =>
  import("../../views/nationality/create/index")
);
const UpdateNationality = lazy(() =>
  import("../../views/nationality/update/index")
);

const NationalityRoutes = [
  {
    path: "/nationality/all",
    element: <AllNationality />,
  },
  {
    path: "/nationality/new",
    element: <CreateNationality />,
  },
  {
    path: "/nationality/update",
    element: <UpdateNationality />,
  },
];

export default NationalityRoutes;

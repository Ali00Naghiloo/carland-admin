import { lazy } from "react";

const AllSimcardNave = lazy(() => import("../../views/simcard/nave/all/index"));
const CreateSimcardNave = lazy(() =>
  import("../../views/simcard/nave/create/index")
);
const UpdateSimcardNave = lazy(() => import("../../views/simcard/nave/update"));

const AllSimcardWithNumbers = lazy(() =>
  import("../../views/simcard/with_number/all/index")
);
const CreateSimcardWithNumber = lazy(() =>
  import("../../views/simcard/with_number/create/index")
);
const UpdateSimcardWithNumber = lazy(() =>
  import("../../views/simcard/with_number/update/index")
);

const SimcardRoutes = [
  {
    path: "/simcard/nave/all",
    element: <AllSimcardNave />,
  },
  {
    path: "/simcard/nave/new",
    element: <CreateSimcardNave />,
  },
  {
    path: "/simcard/nave/update",
    element: <UpdateSimcardNave />,
  },
  {
    path: "/simcard/with_number/all",
    element: <AllSimcardWithNumbers />,
  },
  {
    path: "/simcard/with_number/new",
    element: <CreateSimcardWithNumber />,
  },
  {
    path: "/simcard/with_number/update",
    element: <UpdateSimcardWithNumber />,
  },
];

export default SimcardRoutes;

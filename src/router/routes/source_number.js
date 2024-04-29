import { lazy } from "react";

const AllSourceNumber = lazy(() =>
  import("../../views/source_number/all/index")
);
const CreateSourceNumber = lazy(() =>
  import("../../views/source_number/create/index")
);
const UpdateSourceNumber = lazy(() =>
  import("../../views/source_number/update/index")
);
const SearchSourceNumbers = lazy(() =>
  import("../../views/source_number/search/index")
);

const SourceNumberRoutes = [
  {
    path: "/source_number/all",
    element: <AllSourceNumber />,
  },
  {
    path: "/source_number/new",
    element: <CreateSourceNumber />,
  },
  {
    path: "/source_number/update",
    element: <UpdateSourceNumber />,
  },
  {
    path: "/source_number/search",
    element: <SearchSourceNumbers />,
  },
];

export default SourceNumberRoutes;

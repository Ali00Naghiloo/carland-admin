import { lazy } from "react";

const AllVideos = lazy(() => import("../../views/videos/all/index"));
const CreateVideo = lazy(() => import("../../views/videos/create/index"));
const UpdateVideo = lazy(() => import("../../views/videos/update/index"));

const VideosRoutes = [
  {
    path: "/videos/all",
    element: <AllVideos />,
  },
  {
    path: "/videos/new",
    element: <CreateVideo />,
  },
  {
    path: "/videos/update",
    element: <UpdateVideo />,
  },
];

export default VideosRoutes;

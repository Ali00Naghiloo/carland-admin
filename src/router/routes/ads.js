import { lazy } from "react";

const AllAds = lazy(() => import("../../views/ads/all/index"));
const CreateAd = lazy(() => import("../../views/ads/create/index"));
const UpdateAd = lazy(() => import("../../views/ads/update/index"));
const AssignAd = lazy(() => import("../../views/ads/assign/index"));

const AdsRoutes = [
  {
    path: "/ad/all",
    element: <AllAds />,
  },
  {
    path: "/ad/new",
    element: <CreateAd />,
  },
  {
    path: "/ad/update",
    element: <UpdateAd />,
  },
  {
    path: "/ad/assign",
    element: <AssignAd />,
  },
];

export default AdsRoutes;

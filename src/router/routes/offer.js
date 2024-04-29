import { lazy } from "react";

const AllOffer = lazy(() => import("../../views/offer/all/index"));
const CreateOffer = lazy(() => import("../../views/offer/create/index"));
const UpdateOffer = lazy(() => import("../../views/offer/update/index"));
const AssignOffer = lazy(() => import("../../views/offer/assign/index"));

const OfferRoutes = [
  {
    path: "/offer/all",
    element: <AllOffer />,
  },
  {
    path: "/offer/new",
    element: <CreateOffer />,
  },
  {
    path: "/offer/update",
    element: <UpdateOffer />,
  },
  {
    path: "/offer/assign",
    element: <AssignOffer />,
  },
];

export default OfferRoutes;

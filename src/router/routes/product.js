import { lazy } from "react";

const AllProduct = lazy(() => import("../../views/product/all/index"));
const CreateProduct = lazy(() => import("../../views/product/create/index"));
const UpdateProduct = lazy(() => import("../../views/product/update/index"));

const ProductRoutes = [
  {
    path: "/product/all",
    element: <AllProduct />,
  },
  {
    path: "/product/new",
    element: <CreateProduct />,
  },
  {
    path: "/product/update",
    element: <UpdateProduct />,
  },
];

export default ProductRoutes;

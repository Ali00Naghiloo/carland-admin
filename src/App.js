import React, { useState, useEffect, Suspense } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { setToday } from "./redux/app_slice";
import moment from "jalali-moment";
import { createTheme } from "react-data-table-component";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { getRoutes } from "./router/routes";
import { useLayout } from "@hooks/useLayout";

const App = () => {
  const dispatch = useDispatch();
  const [allRoutes, setAllRoutes] = useState([]);

  // ** Hooks
  const { layout } = useLayout();

  useEffect(() => {
    setAllRoutes(getRoutes(layout));
  }, [layout]);

  useEffect(() => {
    let todayYear = parseInt(moment().locale("fa").format("YYYY"));
    let todayMonth = parseInt(moment().locale("fa").format("MM"));
    let todayDay = parseInt(moment().locale("fa").format("DD"));
    dispatch(setToday({ year: todayYear, month: todayMonth, day: todayDay }));
  }, []);

  // ** Datatable Themes
  createTheme(
    "darkTheme",
    {
      text: {
        primary: "#ffffff",
        secondary: "#ffffffb8",
      },
      background: {
        default: "#283046",
      },
      context: {
        background: "#161d31",
        text: "#FFFFFF",
      },
      divider: {
        default: "#ffffff28",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  );
};

export default App;

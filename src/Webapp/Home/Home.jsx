import React from "react";
import { Link } from "react-router-dom";
import Header from "./HomeHeader";
import ReadNotice from "./ReadNotice";
import NoticesComponent from "./Dashboard";
import NoticesDashboard from "./Dashboard";
import Filter from "./Filter";
const Home2 = () => {
  return (
    <div>
      <Header />
      <ReadNotice/>
      <Filter/>
      <NoticesDashboard/>
    </div>
  );
};

export default Home2;

import React from "react";
import { Link } from "react-router-dom";
import Header from "./HomeHeader";
import ReadNotice from "./ReadNotice";
import NoticesDashboard from "./Dashboard";
import Filter from "./Filter";
import LatestNotices from "../../LandingPage/Latestnotices2";
import CTA from "../CTA";
import Faq from "../../LandingPage/Faq";
import Webtestimonial from "../Notices/Webtestimonial";
import WebFooter from "../Notices/WebFooter";
import LocationsCarousel from "../../LandingPage/locationscourosel/Locations";
import CategoryCarousel from "../../LandingPage/categorycourosel/categories";
import Post from "../PostNotice/post";
const Home2 = () => {
  return (
    <div>
      <Header />
      <ReadNotice/>
      <Filter/>
      <NoticesDashboard/>
      <LatestNotices />
      <LocationsCarousel/>
      <CategoryCarousel/>
      <CTA/>
      <Faq/>
      <Webtestimonial/>
      <Post />
      <WebFooter/>
    </div>
  );
};

export default Home2;

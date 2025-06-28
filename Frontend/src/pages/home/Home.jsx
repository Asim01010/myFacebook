import React from "react";
import Navbar from "../../component/home/Navbar";
import Sidebar from "../../component/home/main content/Sidebar";
import MainContent from "../../component/home/main content/MainContent";
import AdContent from "../../component/home/main content/AdContent";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* main content page */}
      <div className="grid md:grid-cols-12 grid-cols-1 min-h-[90vh] bg-[#f2f4f7]">
        {/* sidebar */}
        <div className="xl:col-span-3  xl:block hidden">
          <Sidebar />
        </div>
        <div className="xl:col-span-6 col-span-8 ">
          {/* maincontent */}
          <MainContent />
        </div>
        <div className="col-span-3 hidden lg:block">
          {/* ad content  */}
          <AdContent />
        </div>
      </div>
    </>
  );
};

export default Home;

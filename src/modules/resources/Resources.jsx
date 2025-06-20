import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import TechnicalWriters from "./TechnicalWriters";
import Developers from "./Developers";
import Designers from "./Designers";
import Layout from "../../components/layout/Layout";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

const Resources = () => {
  const location = useLocation();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (location.state?.initialTab !== undefined) {
      setTab(location.state.initialTab);
    }
  }, [location.state]);

  const resources = [
    { name: "Overview", component: <Overview key="1" /> },
    { name: "Technical Writing", component: <TechnicalWriters key="2" /> },
    { name: "Developer Guide", component: <Developers key="3" /> },
    { name: "Design Guide", component: <Designers key="4" /> },
  ];

  const handleNext = () => {
    setTab((prev) => (prev + 1) % resources.length);
  };

  const handlePrevious = () => {
    setTab((prev) => (prev === 0 ? resources.length - 1 : prev - 1));
  };

  return (
    <Layout>
      {resources[tab].component}
      <div
        className={`${
          tab === 0 ? "justify-end" : "justify-between"
        } bg-[#E3DA35] w-full h-[118px] mb-[140px] flex items-center px-[99px]`}
      >
        {tab !== 0 && (
          <div className="flex items-center gap-x-2">
            <button onClick={handlePrevious}>
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <span className="text-2xl">Previous</span>
            <label className="text-black text-[32px]">
              {resources[tab - 1].name}
            </label>
          </div>
        )}
        {tab !== resources.length - 1 && (
          <div className="flex items-center gap-x-2">
            <span className="text-2xl">Next</span>
            <label className="text-black font-medium text-[32px]">
              {resources[tab + 1].name}
            </label>
            <button
              disabled={tab === resources.length - 1}
              onClick={handleNext}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    setIsResourcesOpen(false);
  }, []);

  return (
    <header className="px-[112px] py-6 relative">
      <nav className="flex items-center justify-between">
        <div>
          <Link to="/">
            <img src="/images/logo.svg" alt="OpenNest logo" />
          </Link>
        </div>
        <ul className="flex items-center justify-between text-base font-semibold text-dark-2 capitalize gap-x-8 bg-[#F7F9FC] rounded-[40px] py-4 px-10">
          <li className="flex items-center gap-x-1">
            use cases <ChevronDownIcon className="w-6 h-6" />
          </li>
          <li className="relative">
            <div
              className="flex items-center gap-x-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsResourcesOpen(!isResourcesOpen);
              }}
              onMouseEnter={() => setIsResourcesOpen(true)}
            >
              Resources <ChevronDownIcon className="w-6 h-6" />
            </div>
            {isResourcesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <Link to={"/resources"}>
                  <button
                    className="b  lock w-full text-left px-4 py-2 text-sm text-gray-700   hover:bg-[#0C9EDD] hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Overview
                  </button>
                </Link>

                <Link to={"/resources/technical-writing"}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-[#0C9EDD] hover:text-white"
                    color=""
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Technical-Writing
                  </button>
                </Link>
                <Link to={"/resources/developers"}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-[#0C9EDD] hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Development
                  </button>
                </Link>
                <Link to={"/resources/designers"}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-[#0C9EDD] hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Design
                  </button>
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/about-us">About us</Link>
          </li>
          <li>What's new</li>
        </ul>
        <Link to="/signup">
          <Button
            text="Sign up"
            className="bg-blue text-white font-semibold text-base py-4 px-10"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;

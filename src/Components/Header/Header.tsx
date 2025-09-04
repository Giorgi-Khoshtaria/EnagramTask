import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import enagram from "../../assets/ENAGRAM.svg";
import abc from "../../assets/check.png";
import compareText from "../../assets/Spelling, Check, Text.png";
import mic from "../../assets/mic.svg";
import aligh from "../../assets/align-center.svg";
import pdf from "../../assets/programming-code-document.png";
import userIcon from "../../assets/User Images.png";
import dots from "../../assets/dots.svg";
import leftArrow from "../../assets/chevrons-left.svg";
import "./header.css";

function Header() {
  const navigation = [
    { name: "მართლმწერი", icon: abc, path: "/spell-checker" },
    { name: "ტექსტის შედარება", icon: compareText, path: "/" },
    { name: "ხმა → ტექსტი", icon: mic, path: "/speech-to-text" },
    { name: "ტექსტი → ხმა", icon: aligh, path: "/text-to-speech" },
    { name: "PDF კონვერტაცია", icon: pdf, path: "/pdf-conversion" },
  ];

  return (
    <header className="bg-dark-Blue w-[240px] min-h-screen flex flex-col relative">
      <div className="absolute top-3 right-[27px]">
        <img src={leftArrow} alt="left arrow" />
      </div>
      <div className="pt-11  flex-grow">
        <NavLink to="/" className="flex items-center gap-[11px] pl-6">
          <img src={logo} alt="logo" />
          <img src={enagram} alt="enagram" />
        </NavLink>

        <nav className="mt-[51px] pl-5">
          <ul>
            {navigation.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-[9px]  font-bold text-sm leading-5 transition-colors duration-300"
              >
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    isActive
                      ? "active-nav-item bg-white pl-3 text-dark-Blue py-5 rounded-l-[30px] flex items-center gap-[9px] w-full "
                      : "text-white py-5 pl-3 rounded-l-[30px] flex items-center gap-[9px] w-full  hover:bg-blue-800 transition"
                  }
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-t-light-blue flex items-center justify-between pl-3.5 pr-3 py-5 mt-auto">
        <div className="flex items-center gap-2">
          <img src={userIcon} alt="user icon" />
          <p className="text-sm leading-5 text-white">თამარ ონიანი</p>
        </div>
        <img src={dots} alt="dots" />
      </div>
    </header>
  );
}

export default Header;

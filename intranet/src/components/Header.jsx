import { useState } from "react";
import Index from "../../src/pages/Index"
import { Link } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { BiFolderMinus } from "react-icons/bi";
import { BiSpreadsheet } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";




import Box from '@mui/material/Box';

const Header = () => {


  const [open, setOpen] = useState(true);


  const Menus = [
    { id: 1, title: "Início", src: "Chart_fill", link: "/", icon: (<BsTelephone />) },
    { id: 2, title: "Departamentos", src: "Chat", link: "/departamentos", icon: (<BiFolderMinus />) },
    { id: 3, title: "Secretarias", src: "User", gap: true, link: "/secretarias", icon: (<BiSpreadsheet />) },
    // { id: 4, title: "Telefones ", src: "Calendar", link: "/telefones", icon: (<BsTelephone />) },
    { id: 5, title: "Painel Administrador", src: "Calendar", gap: true, link: "/login", icon: (<RiAdminLine />) },
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/lista-telefonica.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Lista Telefônica
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link} key={index}>
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                  } `}
              >
                <i style={{ color: "white" }}>
                  {Menu.icon}
                </i>

                <span className={`${!open && "hidden"} origin-left duration-200`}>

                  {Menu.title}

                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1">
        <h1 className="text-2xl font-semibold ">
          {/* <Index /> */}
        </h1>
      </div>
    </div>
  );
};
export default Header;
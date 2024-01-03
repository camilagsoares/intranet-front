import { useState } from "react";
import Index from "../../src/pages/Index"
import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";

const Header = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Início", src: "Chart_fill", link: "/departamentos" },
    { title: "Departamentos", src: "Chat", link: "/departamentos" },
    { title: "Secretarias", src: "User", gap: true, link: "/departamentos" },
    { title: "Telefones ", src: "Calendar", link: "/departamentos" },
    { title: "Sair", src: "Calendar", gap: true, link: "/departamentos" },

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
            Intranet
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                  } `}
              >
                <img src={`./src/assets/${Menu.src}.png`} />

                <span className={`${!open && "hidden"} origin-left duration-200`}>

                  {Menu.title}

                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">
          <Index />
        </h1>
      </div>
    </div>
  );
};
export default Header;
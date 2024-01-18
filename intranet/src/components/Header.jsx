import { useState, useContext } from "react";
import Index from "../../src/pages/Index"
import { Link, useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { BiFolderMinus } from "react-icons/bi";
import { BiSpreadsheet } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Button from '@mui/material/Button';
import { AuthContext } from '../contexts/auth.context'
import ExitToApp from '@mui/icons-material/ExitToAppOutlined';
import Box from '@mui/material/Box';

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const isAuthenticated = !!token;
  const { encerrarSessao } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const Menus = [
    { id: 1, title: "Início", src: "Chart_fill", link: "/", icon: (<BsTelephone />) },
    { id: 2, title: "Departamentos", src: "Chat", link: "/departamentos", icon: (<BiFolderMinus />) },
    { id: 3, title: "Secretarias", src: "User", gap: true, link: "/secretarias", icon: (<BiSpreadsheet />) },
    // { id: 5, title: isAuthenticated ? 'Sair' : "Painel Administrador", src: "Calendar", gap: true, link: "/login", icon: isAuthenticated ? (<FiLogOut />) : (<RiAdminLine />) }
  ];

  const updatedMenus = isAuthenticated ? [
    ...Menus,
    // { id: 5, title: "", src: "Calendar", gap: true, link: "/", icon: <FiLogOut /> },
  ] : [...Menus];
  
  const filteredMenus = isAuthenticated ? updatedMenus : Menus.filter(menu => menu.link === "/" || menu.link === "/login");
  
  const handleClick = (id) => {
    if (id === 5) {
      encerrarSessao();
      window.location.reload();
    }
  };

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
        {filteredMenus.map((Menu, index) => (
  <Link to={Menu.link} key={index}>
    <li
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        ${Menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'}
        ${!open && isAuthenticated ? 'hidden' : ''}`}
    >
      <i style={{ color: 'white' }}>{Menu.icon}</i>
      <ul>
        <li
          className={`${!open && 'hidden'} origin-left duration-200 `}
          key={Menu.id}
          onClick={() => handleClick(Menu.id)}
          style={{
            color: '#F3F4F7',
            textTransform: 'lowercase',
            fontWeight: 'normal',
          }}
        >
          {open ? Menu.title : ''}
        </li>
      </ul>
    </li>
  </Link>
))}


        </ul>
        <br />
     
<Button
  startIcon={isAuthenticated ? <FiLogOut /> : <RiAdminLine />}
  onClick={() => {
    if (isAuthenticated) {
      encerrarSessao();
      window.location.reload();
    } else {
      navigate('/login');
    }
  }}
  className={`${!open && isAuthenticated ? 'hidden ' : ''}`}
  style={{
    color: '#F3F4F7',
    textTransform: 'lowercase',
    paddingRight: !open ? '210px' : '',
  }}
>
  {isAuthenticated && open ? 'Sair' : 'Painel Administrador'}
</Button>

      </div>
      <div className="h-screen flex-1">
        <h1 className="text-2xl font-semibold ">
        </h1>
      </div>
    </div>
  );
};
export default Header;
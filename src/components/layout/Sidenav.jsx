import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { MENU_ITEMS } from "../../constant/navbar";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>BLC TEAM</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {MENU_ITEMS.map(({ key, label, icon }) => (
          <Menu.Item key={key}>
            <NavLink to={`/${key}`}>
              <span
                className="icon"
                style={{ background: page === key ? color : "" }}
              >
                {icon}
              </span>
              <span className="label">{label}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

export default Sidenav;

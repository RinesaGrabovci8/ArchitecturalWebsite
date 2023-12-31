import React, { useContext, useState } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Context } from "../../Context/Context";
import LangFlag from "./LangFlag";
import { language } from "../../lang";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Navbar = () => {
  const { lang, dispatch } = useContext(Context);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuIconDisplay, setMenuIconDisplay] = useState("none");
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const changeLang = () => {
    const setLang = lang === "en" ? "al" : "en";
    dispatch({
      type: "LANG",
      payload: { lang: setLang },
    });
  };

  const handleLangClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorEl(null);
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth < 769) {
      setMenuIconDisplay("block");
    } else {
      setMenuIconDisplay("none");
    }
  });

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <Grid container alignItems="center">
          <Grid item xs={8} sm={6}>
            <NavLink to="/" className="logo-link">
              <img src={logo} alt="logo" />
            </NavLink>
          </Grid>
          <Grid item xs={4} sm={6} container justifyContent="flex-end">
            <button className="menuicon" onClick={toggleMenu} style={{ display: menuIconDisplay }}>
              <MenuRoundedIcon />
            </button>
          </Grid>
        </Grid>
        <ul className={`nav-links ${menuVisible ? "active" : ""}`}>
          {language[lang].navbarLinks.map((obj) => (
            <li key={obj.name}>
              <NavLink to={obj.path} onClick={() => setMenuVisible(false)}>
                {obj.name}
              </NavLink>
            </li>
          ))}
          <li>
            <Button aria-controls="lang-menu" aria-haspopup="true" onClick={handleLangClick}>
              <LangFlag lang={lang} />
            </Button>
            <Menu
              id="lang-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleLangClose}
            >
              <MenuItem onClick={changeLang}>ALB</MenuItem>
              <MenuItem onClick={changeLang}>ENG</MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import NavHome from "./Navbar/nav_home";
import Navbarcl from "./Navbar/nav_client";
import NavbarSeller from "./Navbar/nav_seller"; // Import NavSeller component
import NavbarAlt from "./Navbar/nav_alternate";
// import NavAlternate from "./Navbar/nav_alternate"; // Import NavAlternate component

const Navbar = ({ isAuthenticated, persontype ,logout , setPersonType , navbarAlt}) => {

return (
  <>
    {/* {console.log("isauthenticated"+isAuthenticated)} */}
    {/* {console.log("persontype"+persontype)} */}
    {isAuthenticated && persontype === "client" && <Navbarcl logout={logout} setPersonType={setPersonType}/>}
    {isAuthenticated && persontype === "seller" && <NavbarSeller logout={logout} />}
    {persontype === "alternate" && <NavbarAlt  />}
    {!isAuthenticated && <NavHome/>}
  </>
);

};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  persontype: state.auth.persontype,
});

export default connect(mapStateToProps, { logout })(Navbar);




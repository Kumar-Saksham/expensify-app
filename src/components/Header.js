import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../routers/AppRouter";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
  <header>
    {history.location.pathname !== "/dashboard" && (
      <NavLink
        to="/dashboard"
        exact
        activeClassName="is-active"
        className="floaty expense-header expense-header__to-dashboard"
      >
        <img className="expense-create__icon" src="/images/arrow.svg" />
      </NavLink>
    )}
    {history.location.pathname === "/dashboard" && (
      <NavLink
        to="/create"
        activeClassName="is-active"
        className="floaty expense-header"
      >
        <img className="expense-create__icon" src="/images/add.svg" />
      </NavLink>
    )}
    {/* <NavLink to="/help" activeClassName="is-active">
      HELP{" "}
    </NavLink> */}
    {/* <button onClick={startLogout}>Logout</button> */}
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);

import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div className="loginpage">
    <div className="loginpage__bg">
      <div className="loginpage__bg__box loginpage__bg__left" />
      <div className="loginpage__bg__box loginpage__bg__right" />
    </div>
    <div className="box-layout">
      <div className="box-layout__box-container">
        <div className="box-layout__box box-layout__des-box">
          <h1 className="box-layout__title">Ex.</h1>
          <p className="box-layout__des">Start managing your expenses now.</p>
        </div>
        <div className="box-layout__box box-layout__login-box">
          <button
            className="box-layout__login-box__button button"
            onClick={startLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);

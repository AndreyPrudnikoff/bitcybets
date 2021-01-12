import React from 'react';
import './header.scss';
import logo from '../../images/logo.svg';
import ava from '../../images/ava.png';
import {connect} from "react-redux";
import {prohibition} from "../../redux/actions";

const Header = ({prohibition, auth}) => {
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <a className="navbar-brand" href="https://google.com">
                        <img src={logo} alt="" width="32" height="32"
                             className="d-inline-block align-top"/>
                        BITCY<span>BETS</span>
                    </a>
                </nav>
                <h4 style={auth ? {display: 'block'} : {display: 'none'}} className="text-center">Bitcoin Live price</h4>
                <img style={auth ? {display: 'block'} : {display: 'none'}} onClick={e => {
                    e.preventDefault();
                    prohibition();
                }} src={ava} alt="icon"/>
            </header>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth
    }
}
const mapDispatchToProps = {
    prohibition
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, {useState, useEffect} from 'react';
import './refill.scss';
import bitcoin from "../../images/bitcoin.svg";
import dollar from "../../images/dollar.svg";
import arrows from "../../images/arrows.svg";
import back from "../../images/back.svg";
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import {createAdProp} from "../../redux/actions";
import {connect} from "react-redux";
import {playClick} from "../../redux/actions/music";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

let socket = new WebSocket("wss://bitcybets.com:8080/serv");
let bitcoins = [];
socket.onmessage = async e => {
    (JSON.parse(e.data)).forEach(course => {
        bitcoins.push(course.Bitcoin);
    });
}
const Refill = ({createAd, createAdProp, history, currentLang, playClick}) => {
    let currentCourse = bitcoins[bitcoins.length - 1];
    console.log(currentCourse)
    const [bit, setBit] = useState(0);
    const [usd, setUsd] = useState(0);
    const [reverse, setReverse] = useState(false);
    const LANG = currentLang === "en" ? EN : RU;
    // useEffect(() => socket.close())
    return (
        <div>
            <Header/>
            <div style={{display: createAd ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>This feature coming soon</h2>
                        <button onClick={() => {
                            createAdProp();
                            playClick()
                        }} className="btn btn-primary">OK
                        </button>
                    </div>
                </div>
            </div>
            <div className="refill">
                <div className="round-dark">
                    <span onClick={() => {
                        history.goBack();
                        playClick()
                    }} className="back"><img src={back} alt="back"/></span>
                    <h2 className='currentLang'>{LANG.FulfillingRealMoney.CurrencyExchange.title}</h2>
                    <div className={currentLang + " amount"}>{LANG.FulfillingRealMoney.CurrencyExchange.amount}</div>
                    <br/>
                    <div className={reverse ? "refill-input flex-row-reverse" : "refill-input"}>
                        <div className="input-wrap">
                            <input value={bit}
                                   onChange={(e) => {
                                       setBit(e.target.value);
                                       setUsd(e.target.value * currentCourse);
                                   }}
                                   placeholder="0.000" type="text"/>
                                   <img className="currency" src={bitcoin} width="15" alt="btc"/>
                        </div>
                        <img onClick={() => {
                            setReverse(!reverse);
                            playClick()
                        }} className="arrows" src={arrows} alt="arrows"/>
                        <div className="input-wrap">
                            <input value={usd}
                                   onChange={(e) => {
                                       setUsd(e.target.value);
                                       const btc = (e.target.value / currentCourse).toFixed(8)
                                       setBit(btc);
                                   }}
                                   placeholder="0.000" type="text"/>
                            <img className="currency" src={dollar} width="15" alt="usd"/>
                        </div>
                    </div>
                    <div className="refill-btn">
                        <Link to="/refill/btc" className="pay" onClick={playClick}><span
                            className='currentLang'>{LANG.FulfillingRealMoney.CurrencyExchange.btnDeposit}</span><img
                            src={bitcoin} width="15"
                            alt="bit"/></Link>
                        <button onClick={() => {
                            window.open('https://flutterwave.com/pay/z0zmqctlrtvn', '_blank');
                            playClick();
                        }} className="pay"><span
                            className='currentLang'>{LANG.FulfillingRealMoney.CurrencyExchange.btnDeposit}</span><img
                            src={dollar} width="15"
                            alt="bit"/></button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/support" className={currentLang + " support-link"}
                              onClick={playClick}>{LANG.support}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        createAd: state.switchOptions.createAd,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    createAdProp,
    playClick
}
export default connect(mapStateToProps, mapDispatchToProps)(Refill);

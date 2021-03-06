import React, {useState, useEffect} from 'react';
import './start.scss';
import Graph from "../Graph";
import Time from "../Main/Time";
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";
import arrowDown from "../../images/arrowDown.svg";
import arrowUp from "../../images/arrowUp.svg";
import bull from "../../images/bull_start.png";
import bear from "../../images/bear_start.png";
import Rect from "../Main/Rect/Rect";
import coin from "../../images/coin.svg";
import {userdata} from "../../redux/actions/game";
import {registration} from "../../redux/actions";
import {playClick, up_down, startWin, muteToggle, playYouWon} from "../../redux/actions/music";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Start = ({
                   currentCourse,
                   course,
                   history,
                   lastSeconds,
                   userdata,
                   widthMode,
                   registration,
                   currentLang,
                   playClick,
                   up_down,
                   startWin,
                   muteToggle,
                   mute,
                   playYouWon
               }) => {
    const [timeGame, setTimeGame] = useState(false);
    const [start, setStart] = useState(false);
    const [bet, setBet] = useState('');
    const [predict, setPredict] = useState('');

    const LANG = currentLang === "en" ? EN : RU

    useEffect(() => {
        if (lastSeconds % 10 === 0 && start) {
            setTimeGame(true);
        }
    }, [lastSeconds])
    useEffect(() => {
        if (lastSeconds % 10 === 0 && start) {
            if (bet === 'down' && currentCourse < course[course.length - 2]) {
                setPredict('win');
                setBet('');
                playYouWon()
            } else if (bet === 'down' && currentCourse > course[course.length - 2]) {
                setPredict('lose');
                setBet('');
                playYouWon()
            } else if (bet === 'up' && currentCourse > course[course.length - 2]) {
                setPredict('win');
                setBet('');
                playYouWon()
            } else if (bet === 'up' && currentCourse < course[course.length - 2]) {
                setPredict('lose');
                setBet('');
                playYouWon()
            } else {
                setBet('');
            }
        }

    }, [currentCourse])
    return (
        <div className="start">
            <div style={{display: predict ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                       <span onClick={() => {
                           setPredict('');
                           setBet('');
                           playClick()
                       }} className="chross">&#10008;</span>
                        <h2 className={currentLang}>{LANG.Main.Modal.title.first}
                            <br/> {currentLang === "en" ? LANG.Main.Modal.title.second : null}</h2>
                        {/* <h2>{currentLang === "en" ? LANG.Main.Modal.title.first <br/> LANG.Main.Modal.title.second : LANG.Main.Modal.title.first}</h2> */}
                        {/* <h2>You did great! <br/> Join now!</h2> */}
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/login');
                            playClick()
                        }} className={currentLang + " btn btn-primary"}>
                            {LANG.Main.Modal.logIn}
                        </button>
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/signup');
                            registration();
                            playClick()
                        }} className={currentLang + " btn btn-primary"}>
                            {LANG.Main.Modal.signUp}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${widthMode}-start round round-dark`}>
                <div className="bull-start-mobile"><img src={bull} width="" alt="bull"/></div>
                <div className="bear-start-mobile"><img src={bear} width="" alt="bear"/></div>
                <div className="bull-start"><img src={bull} alt="bull"/></div>
                <div className="bear-start"><img src={bear} alt="bear"/></div>
                <div className="text text-center">
                    <h2>
                        <span className="gold">BITCY</span>BETS
                    </h2>
                    <p className={currentLang + " mt-3"}>{LANG.Main.Start.content}</p>
                </div>
                <div className="dark">
                    <Time/>
                    <div className="course">
                        <h2 style={{opacity: !currentCourse ? 0 : 1}} className="text-center"><img src={bitcoin}
                                                                                                   alt="course"/>
                            {currentCourse} <span>$</span>
                        </h2>
                        <div>
                        </div>
                    </div>
                    <div style={{display: !currentCourse ? "none" : "block"}} className="graph">
                        <Graph gradient1={20} gradient2={150} chartHeight={widthMode === "desktop" ? 200 : 150}/>
                    </div>
                    <div style={{display: currentCourse ? "none" : "block"}} className="load">
                        <div className="wrap-img-preload">
                            <img className="coin1" src={coin} alt=""/>
                            <img className="coin2" src={coin} alt=""/>
                            <img className="coin3" src={coin} alt=""/>
                            <img className="coin4" src={coin} alt=""/>
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="wrap-btn">
                            <button disabled={bet || !currentCourse} onClick={() => {
                                setBet('down');
                                if (!mute) {
                                    muteToggle()
                                }
                                up_down();
                                setStart(true)
                            }}
                                    className={currentLang + " btn green green-start predict-btn"}
                                    id="down">
                                <span className={currentLang + " green"}>{LANG.Main.Start.btnUp}</span>
                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                <Rect start={timeGame} infinite={'infinity'} idButton={'down'}
                                      mode={start ? 'rectUp' : ''}/>
                            </button>
                            <button disabled={bet || !currentCourse} onClick={() => {
                                setBet('up');
                                if (!mute) {
                                    muteToggle()
                                }
                                up_down();
                                setStart(true)
                            }}
                                    className={currentLang + " btn red red-start predict-btn"}
                                    id="down">
                                <span className={currentLang + " red"}>{LANG.Main.Start.btnDown}</span>
                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                <Rect infinite={'infinity'} idButton={'down'} mode={start ? 'rectDown' : ''}/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg"/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentCourse: state.courseReducer.currentCourse,
        course: state.courseReducer.course,
        lastSeconds: state.courseReducer.lastSeconds,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang,
        mute: state.soundReducer.mute
    }
}
const mapDispatchToProps = {
    userdata,
    registration,
    playClick,
    up_down,
    startWin,
    muteToggle,
    playYouWon
}
export default connect(mapStateToProps, mapDispatchToProps)(Start);

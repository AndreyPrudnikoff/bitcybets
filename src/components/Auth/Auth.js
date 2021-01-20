import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import './auth.scss';
import {authorization, registration} from "../../redux/actions";
import {User} from "../../api/User";

const Auth = ({reg, authorization, registration}) => {
    const [password, setPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [err, setErr] = useState('')
    console.log()
    const handleSubmit = event => {
        event.preventDefault();

        const body = JSON.stringify({name, phone, email, pass, confpass});

        User.register(body)
            .then(res => res)
            .then(data => {
                return data.data.status === "success" ? registration() : data.data.error ? setErr(data.data.error) : null;
            })
            .catch(e => setErr(e))
        console.log(err)
    }
    const handleLogin = event => {
        event.preventDefault();
        const body = JSON.stringify({email, pass});

        // User.login(body)
        //     .then(res => res)
        //     .then(data => {
        //             if (data.data.status === "success") {
        //                 const token = data.data.data.accessToken;
        //                 localStorage.setItem('token', token);
        //                 authorization();
        //             } else if (data.data.error) {
        //                 setErr(data.data.error);
        //             }
        //         }
        //     )
        //     .catch(e => console.log(e));
        authorization();
    }
    if (!reg) {
        return (
            <div className="round-dark auth">
                <h2>Welcome</h2>
                <form onSubmit={handleLogin}>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input onInput={e => setEmail(e.target.value)} id="email" name="email" type="mail" required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => setPassword(!password)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input onInput={e => setPass(e.target.value)} id="password" name="password"
                               type={password ? 'password' : 'text'} required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <Link to="/restore" className="forgot mb-3">Forgot password?</Link>
                    <button>SIGN IN</button>
                    <span>or</span>
                    <button onClick={e => {
                        e.preventDefault();
                        registration();
                    }}>REGISTER
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="round-dark auth">
                <span onClick={() => {
                    registration();
                }} className="back">&larr;</span><h2 className="">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name">Name</label>
                        <input onChange={e => setName(e.target.value)}
                               value={name}
                               id="name" name="name" type="text" required/>
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <input onChange={e => setPhone(e.target.value)}
                               value={phone}
                               id="phone" name="phone" type="tel" required/>
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)}
                               value={email}
                               id="email" name="email" type="email" required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => setPassword(!password)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPass(e.target.value)}
                               value={pass}
                               id="password" name="password" type={password ? 'password' : 'text'} required/>
                    </div>
                    <div className={passwordConfirm ? 'pass' : 'text'}>
                        <span onClick={() => setPasswordConfirm(!passwordConfirm)} className="eye"/>
                        <label htmlFor="passwordConfirm">Repeat password</label>
                        <input onChange={e => setConfpass(e.target.value)}
                               value={confpass}
                               id="passwordConfirm" name="passwordConfirm" type={passwordConfirm ? 'password' : 'text'}
                               required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <button>REGISTER</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reg: state.authReducer.reg
    }
}
const mapDispatchToProps = {
    authorization,
    registration
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

import React, { useState, useContext, useEffect } from "react";
import eyeopen from "../assets/eyeopen.png"
import eyeclose from "../assets/eyeclose.png"
import google from "../assets/google.png"
import twitter from "../assets/twitter.png"
import closeWhite from "../assets/closeWhite.png"



import { Link } from "react-router-dom";
import { axiosHandler, errorHandler } from "../helper";
import { LOGIN_URL } from "../urls";
import { json } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import { checkAuthState, tokenName } from "./authController";


export const loginRequest = async ( data, seterror, props ) =>
{
    console.log( data )
    const result = await axiosHandler( {
        method: "post",
        url: LOGIN_URL,
        data: data
    } ).catch( ( e ) => seterror( errorHandler( e ) ) )
    if ( result )
    {
        localStorage.setItem( tokenName, JSON.stringify( result.data ) )
        window.location.href = "/"
    }
}


const Login = ( props ) =>
{
    const [ loginData, setloginData ] = useState( {} );
    const [ loading, setloading ] = useState( false );
    const [ showPassword, setShowPassword ] = useState( false );
    const [ error, seterror ] = useState()
    const [ checking, setchecking ] = useState( localStorage.getItem( tokenName ) );


    useEffect(
        () =>
        {
            if ( checking )
            {
                checkAuthState(
                    () => null,
                    () => { window.location.href = "/" },
                    props
                )
            }
        }, []
    )

    const submit = async ( e ) =>
    {
        e.preventDefault();
        setloading( true )
        seterror( null )
        await loginRequest( loginData, seterror, props )
        setloading( false )
    }

    const onChange = ( e ) =>
    {
        setloginData(
            {
                ...loginData,
                [ e.target.name ]: e.target.value
            }
        )
    }

    return (
        <div className="loginContainer">
            {
                checking ? (
                    <div className="centerAll">
                        <Loader />
                    </div>
                ) : (
                    <div className="inner">
                        <div className="logo">
                            SITE31
                        </div>
                        <div className="title">
                            Sign in
                        </div>
                        <AuthForm
                            login data={ loginData }
                            onSubmit={ submit }
                            onChange={ onChange }
                            showPassword={ showPassword }
                            setShowPassword={ setShowPassword }
                            loading={ loading }
                            error={ error }
                            seterror={ seterror }
                        />
                        <div className="grid grid-2 grid-gap-2">
                            <div className="socialButton">
                                <img src={ twitter } /> <span>Twitter</span>
                            </div>
                            <div className="socialButton">
                                <img src={ google } /> <span>Google</span>
                            </div>
                        </div>
                        <div className="switchOption">
                            Don’t have an accout yet? <Link to="/register"><b>Sign up</b></Link>
                        </div>
                    </div >
                )
            }

        </div >
    )
}

export const AuthForm = ( props ) =>
{
    return (
        <>
            {
                props.error && (
                    <div className="errorHolder">
                        <div dangerouslySetInnerHTML={ { __html: props.error } } />
                        <img src={ closeWhite } onClick={ () => props.seterror( null ) } />
                    </div>
                )
            }

            <form onSubmit={ props.onSubmit }>
                { !props.login &&
                    <input
                        value={ props.data.email }
                        onChange={ props.onChange }
                        name="email"
                        className="input-field"
                        placeholder="Email"
                        required
                    />
                }
                <div className="input-container">
                    <input
                        value={ props.data.username }
                        onChange={ props.onChange }
                        name="username"
                        className="input-field"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="input-container">
                    <input type={ !props.showPassword ? "password" : "text" }
                        value={ props.data.password }
                        onChange={ props.onChange }
                        name="password"
                        className="input-field"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                    />
                    <img src={ !props.showPassword ? eyeopen : eyeclose }
                        onClick={ () => props.setShowPassword( !props.showPassword ) }
                    />
                </div>
                {
                    props.login && ( <div className="flex justify-end">
                        <Link to="/">Forgot Password</Link>
                    </div> )
                }
                <button type="submit" disabled={ props.loading }>{
                    props.loading ?
                        ( <center><Loader /></center> ) :
                        props.login ? "Login" : "Register"
                }</button>
            </form>
        </>
    )
}

export default Login
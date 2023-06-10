import React, { useState, useContext } from "react";
import eyeopen from "../assets/eyeopen.png"
import eyeclose from "../assets/eyeclose.png"
import google from "../assets/google.png"
import twitter from "../assets/twitter.png"
import closeWhite from "../assets/closeWhite.png"
import { AuthForm, loginRequest } from "./login";



import { Link } from "react-router-dom";
import { axiosHandler, errorHandler } from "../helper";
import { LOGIN_URL, REGISTER_URL } from "../urls";
import { json } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";

const Register = ( props ) =>
{
    const [ RegisterData, setRegisterData ] = useState( {} );
    const [ loading, setloading ] = useState( false );
    const [ showPassword, setShowPassword ] = useState( false );
    const [ error, seterror ] = useState()

    const submit = async ( e ) =>
    {
        e.preventDefault();
        setloading( true )
        seterror( null )
        const result = await axiosHandler( {
            method: "post",
            url: REGISTER_URL,
            data: RegisterData,
        } ).catch( ( e ) => seterror( errorHandler( e ) ) )
        if ( result )
        {
            await loginRequest( RegisterData, seterror, props )
        }
        setloading( false )

    }

    const onChange = ( e ) =>
    {
        setRegisterData(
            {
                ...RegisterData,
                [ e.target.name ]: e.target.value
            }
        )
    }
    return (
        <div className="loginContainer">
            <div className="inner">
                <div className="logo">
                    SITE31
                </div>
                <div className="title">
                    Sign up
                </div>
                <AuthForm
                    data={ RegisterData }
                    onSubmit={ submit }
                    onChange={ onChange }
                    showPassword={ showPassword }
                    setShowPassword={ setShowPassword }
                    loading={ loading }
                    error={ error }
                    seterror={ seterror }
                />
                <div className="switchOption">
                    Already got an account? <Link to="/login"><b>Sign in</b></Link>
                </div>
            </div >
        </div >
    )
}

export default Register
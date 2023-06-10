import React, { useState, useEffect, useContext } from "react";
import { activeChatAction, userDetailAction } from "./stateManagement/actions";
import { store } from "./stateManagement/store";
import { sendTestSocket } from "./socketService";

const SimpleMessage = ( props ) =>
{
    const [ Name, setName ] = useState( "" );
    const [ ShowMessage, setShowMessage ] = useState( false );

    const { dispatch } = useContext( store )

    const onsubmit = ( e ) =>
    {
        e.preventDefault();
        dispatch( { type: userDetailAction, payload: Name } )
        setShowMessage( true )
    }

    return (
        <>
            { !ShowMessage ? (
                <div>
                    <h2>Hello, Enter your Name</h2>
                    <form onSubmit={ onsubmit }>
                        <input type="text" value={ Name } onChange={ ( e ) => setName( e.target.value ) } />
                        <button type="submit">submit</button>
                    </form>
                </div>
            ) : (
                <MessageInterface />
            ) }
        </>
    )
}

export default SimpleMessage


const MessageInterface = ( props ) =>
{
    const [ Name, setName ] = useState( "" );
    const [ Message, setMessage ] = useState( "" );
    const [ Messages, setMessages ] = useState( "" );
    const [ Receiver, setReceiver ] = useState( "" );
    const {
        state: { userDetail, activeChat },
        dispatch,
    } = useContext( store );
    useEffect( () =>
    {
        if ( Name != userDetail )
        {
            setName( userDetail );
        }
        if ( activeChat )
        {
            setMessages( [ ...Messages, activeChat ] )
            dispatch( { type: activeChatAction, payload: null } )
        }
    }, [ userDetail, activeChat ] )

    const submit = ( e ) =>
    {
        e.preventDefault();
        let data = {
            sender: Name,
            Receiver,
            Message,
        }
        setMessages( [ ...Messages, data ] )
        sendTestSocket( data )
    }

    return (
        <div>
            <h2>Hello { Name }</h2>
            <form onSubmit={ submit }>
                Receiver:<input value={ Receiver } onChange={ ( e ) => setReceiver( e.target.value ) } />
                <br />
                Message:<textarea value={ Message } onChange={ ( e ) => setMessage( e.target.value ) }></textarea>
                <br />
                <button type="submit">send</button>
            </form>
            {
                Messages.length < 1 ? (
                    <div>
                        No Messages yet
                    </div>
                ) : (
                    Messages.map( ( item, index ) =>
                    {
                        return (
                            <div key={ index }>
                                <h3>
                                    { item.sender }:
                                </h3>
                                * { item.Message }
                                <hr />
                            </div>
                        )
                    } )
                )
            }
        </div>
    )
}
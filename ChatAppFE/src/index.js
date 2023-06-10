import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import { StoreProvider } from "./stateManagement/store";
import SocketService from "./socketService";
import Router from "./router";
import "./style.scss"


ReactDom.render(
    <div>
        <StoreProvider>
            <Router />
            <SocketService />
        </StoreProvider>
    </div>, document.getElementById( "root" ) );

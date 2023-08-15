import React from "react";
import UserPanel from "./UserPanel";
import Favorite from "./Favorite";
import DirectMessages from "./DirectMessages";
import ChatRoom from "./ChatRoom";

function SidePanel() {
    return (
        <div style={{ background: "#7B83EB", padding: "2rem", minHeight: "100vh", color: "white", minWidth: "275px" }}>
            <UserPanel />
            <Favorite />
            <ChatRoom />
            <DirectMessages />
        </div>
    );
}

export default SidePanel;

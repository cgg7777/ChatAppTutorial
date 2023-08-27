import React from "react";
import moment from "moment";
function Message({ message, user }) {
    const isImage = (message) => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    };
    return (
        <div className="card-container">
            <img className="card-img-message" src={message.user.image}></img>
            <div className="card-content-message">
                <p className="card-header-message">{message.user.name}</p>
                <p>{message.content}</p>
            </div>
        </div>
    );
}

export default Message;

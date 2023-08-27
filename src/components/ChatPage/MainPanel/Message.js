import React from "react";
import moment from "moment";
import { IoMdImage } from "react-icons/io";
function Message({ message, user }) {
    const isImage = (message) => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    };
    return (
        <div className="card-container">
            <img className="card-img-message" src={message.user.image}></img>
            <div className="card-content-message">
                <p className="card-header-message">{message.user.name}</p>
                {isImage(message) ? <img style={{ maxWidth: "300px" }} src={message.image} /> : <p>{message.content}</p>}
            </div>
        </div>
    );
}

export default Message;

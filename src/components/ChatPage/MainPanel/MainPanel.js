import React, { Component } from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import { connect } from "react-redux";
import { child, getDatabase, ref } from "firebase/database";
import { onChildAdded } from "firebase/database";
import { Button } from "react-bootstrap";
export class MainPanel extends Component {
    state = {
        messages: [],
        messagesRef: ref(getDatabase(), "messages"),
        messagesLoading: true,
    };
    componentDidMount() {
        const { chatRoom } = this.props;
        if (chatRoom) this.addMessagesListener(chatRoom.id);
    }
    addMessagesListener = (chatRoomId) => {
        let messagesArray = [];
        onChildAdded(child(this.state.messagesRef, chatRoomId), (DataSnapshot) => {
            messagesArray.push(DataSnapshot.val());
            this.setState({ messages: messagesArray, messagesLoading: false });
        });
    };
    renderMessages = (messages) => messages.length > 0 && messages.map((message) => <Message key={message.timestamp} message={message} user={this.props.user} />);
    render() {
        const { messages } = this.state;

        return (
            <div style={{ padding: "2rem 2rem 0 2rem" }}>
                <MessageHeader />
                <div
                    style={{
                        width: "100%",
                        height: "350px",
                        border: ".2rem solid #ececec",
                        borderRadius: "4px",
                        padding: "1rem",
                        marginBottom: "1rem",
                        overflowY: "auto",
                    }}
                >
                    {this.renderMessages(messages)}
                </div>
                <MessageForm />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        chatRoom: state.chatRoom.currentChatRoom,
    };
};

export default connect(mapStateToProps)(MainPanel);

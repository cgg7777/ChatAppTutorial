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
        searchTerm: "",
        searchResult: [],
        searchLoading: false,
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
    handleSearchMessage = () => {
        const chatRoomMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, "gi");
        const searchResult = chatRoomMessages.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        this.setState({ searchResult });
        setTimeout(() => this.setState({ searchLoading: false }), 1000);
    };
    handleSearchChange = (event) => {
        this.setState(
            {
                searchTerm: event.target.value,
                searchLoading: true,
            },
            () => this.handleSearchMessage()
        );
    };
    render() {
        const { messages, searchTerm, searchResult } = this.state;

        return (
            <div style={{ padding: "2rem 2rem 0 2rem" }}>
                <MessageHeader handleSearchChange={this.handleSearchChange} />
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
                    {searchTerm ? this.renderMessages(searchResult) : this.renderMessages(messages)}
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

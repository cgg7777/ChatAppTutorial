import React, { Component } from "react";
import { FaRegSmileWink } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { DataSnapshot, getDatabase, off, push, ref, update } from "firebase/database";
import { setCurrentChatRoom } from "../../../redux/actions/chatRoom_action";
import { onChildAdded } from "firebase/database";
export class ChatRoom extends Component {
    state = {
        show: false,
        name: "",
        description: "",
        chatRoomsRef: ref(getDatabase(), "chatRooms"),
        chatRooms: [],
        firstLoad: true,
        activeChatRoomID: "",
    };
    componentDidMount() {
        this.AddChatRoomsListensers();
    }
    componentWillUnmount() {
        off(this.state.chatRoomsRef);
    }
    setFirstChatRoom() {
        const firstChatRoom = this.state.chatRooms[0];
        if (this.state.firstLoad && this.state.chatRooms.length > 0) {
            this.props.dispatch(setCurrentChatRoom(firstChatRoom));
            this.setState({ activeChatRoomID: firstChatRoom.id });
        }
        this.setState({ firstLoad: false });
    }
    AddChatRoomsListensers = () => {
        let chatRoomsArray = [];
        onChildAdded(this.state.chatRoomsRef, (DataSnapshot) => {
            chatRoomsArray.push(DataSnapshot.val());
            this.setState({ chatRooms: chatRoomsArray }, () => this.setFirstChatRoom());
        });
    };
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        if (this.isFormValid(name, description)) {
            this.addChatRoom();
        }
    };
    addChatRoom = async () => {
        const key = push(this.state.chatRoomsRef).key;
        const { name, description } = this.state;
        const { user } = this.props;
        console.log(user);
        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createdBy: {
                name: user.displayName,
                image: user.photoURL,
            },
        };
        try {
            const updates = {};
            updates[key] = newChatRoom;
            await update(this.state.chatRoomsRef, updates);
            this.setState({
                name: "",
                description: "",
                show: false,
            });
        } catch (error) {
            alert(error);
        }
    };
    isFormValid = (name, description) => name && description;
    changeChatRoom = (room) => {
        this.props.dispatch(setCurrentChatRoom(room));
        this.setState({ activeChatRoomID: room.id });
    };
    renderChatRooms = (chatRooms) =>
        chatRooms.length > 0 &&
        chatRooms.map((room) => (
            <li
                style={{ backgroundColor: room.id === this.state.activeChatRoomID && "#ffffff45" }}
                onClick={() => this.changeChatRoom(room)}
                key={room.id}
            >
                #{room.name}
            </li>
        ));

    render() {
        return (
            <div>
                <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    CHAT ROOMS (1)
                    <FaPlus onClick={this.handleShow} style={{ position: "absolute", right: "0", cursor: "pointer" }} />
                </div>
                <ul style={{ listStyleType: "none", padding: 0 }}>{this.renderChatRooms(this.state.chatRooms)}</ul>
                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a chat room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>방 이름</Form.Label>
                                    <Form.Control
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                        type="text"
                                        placeholder="Enter a chat room name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>방 설명</Form.Label>
                                    <Form.Control
                                        onChange={(e) => this.setState({ description: e.target.value })}
                                        type="text"
                                        placeholder="Enter a chat room description"
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                방 생성
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
    };
};
export default connect(mapStateToProps)(ChatRoom);

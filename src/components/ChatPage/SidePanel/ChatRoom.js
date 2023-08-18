import React, { Component } from "react";
import { FaRegSmileWink } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export class ChatRoom extends Component {
    state = {
        show: false,
    };
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    CHAT ROOMS (1)
                    <FaPlus onClick={this.handleShow} style={{ position: "absolute", right: "0", cursor: "pointer" }} />
                </div>

                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a chat room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>방 이름</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a chat room name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>방 설명</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a chat room description" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ChatRoom;

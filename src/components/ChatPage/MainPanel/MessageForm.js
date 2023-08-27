import React, { useRef, useState } from "react";
import { FloatingLabel, Form, ProgressBar, Row, Col } from "react-bootstrap";
import { getDatabase, ref, set, push, child, serverTimestamp } from "firebase/database";
import { useSelector } from "react-redux";
import mime from "mime-types";
import { getStorage, uploadBytes, ref as storRef } from "firebase/storage";

function MessageForm() {
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const db = getDatabase();
    const messageRef = ref(db, "messages");
    const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
    const user = useSelector((state) => state.user.currentUser);
    const inputOpenImageRef = useRef();
    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    };
    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const metaData = { contentType: mime.lookup(file.name) };
        const filePath = `message/public/${file.name}`;
        try {
            const storage = getStorage();
            const storageRef = storRef(storage, filePath);
            const uploadTaskSnapshot = await uploadBytes(storageRef, file, metaData);
        } catch (error) {
            console.log(error);
        }
    };
    const createMessage = (fileurl = null) => {
        serverTimestamp(getDatabase());
        const message = {
            timestamp: serverTimestamp(getDatabase()),
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL,
            },
        };
        if (fileurl !== null) {
            message["image"] = fileurl;
        } else {
            message["content"] = content;
        }
        return message;
    };
    const handleSubmit = async () => {
        if (!content) {
            setErrors((prev) => prev.concat("Type contents first"));
        }
        setLoading(true);
        try {
            await set(push(child(messageRef, chatRoom.id)), createMessage());
            setLoading(false);
            setContent("");
            setErrors([]);
        } catch (error) {
            setErrors((pre) => pre.concat(error.message));
            setLoading(false);
            setTimeout(() => {
                setErrors([]);
            }, 5000);
        }
    };
    const handleChange = (event) => {
        setContent(event.target.value);
    };
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control as="textarea" onChange={handleChange} row={3} style={{}} />
                </FloatingLabel>
            </Form>

            <ProgressBar variant="warning" label="60%" now={60} />
            <div>
                {errors.map((errorMsg) => (
                    <p style={{ color: "red" }} key={errorMsg}>
                        {errorMsg}
                    </p>
                ))}
            </div>
            <Row>
                <Col>
                    <button onClick={handleSubmit} className="message-form-button" style={{ width: "100%" }}>
                        SEND
                    </button>
                </Col>

                <Col>
                    <button onClick={handleOpenImageRef} className="message-form-button" style={{ width: "100%" }}>
                        UPLOAD
                    </button>
                </Col>
            </Row>
            <input type="file" style={{ display: "none" }} onChange={handleUploadImage} ref={inputOpenImageRef} />
        </div>
    );
}

export default MessageForm;

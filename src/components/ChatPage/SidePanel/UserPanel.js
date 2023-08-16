import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import mime from "mime-types";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function UserPanel() {
    const user = useSelector((state) => state.user.currentUser);
    const inputOpenImageRef = useRef();
    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    };
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth);
    };
    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const metaData = { contentType: mime.lookup(file.name) };
        console.log(file);

        try {
            const storage = getStorage();
            const storageRef = ref(storage, `user_image/${user.uid}`);
            const uploadTaskSnapshot = await uploadBytes(storageRef, file, metaData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h3 style={{ color: "white" }}>
                <IoIosChatboxes /> Chat App
            </h3>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
                <Image src={user && user.photoURL} style={{ width: "30px", height: "30px" }} roundedCircle />
                <Dropdown>
                    <Dropdown.Toggle style={{ background: "transparent", border: "0px" }} id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <input
                style={{ display: "none" }}
                onChange={handleUploadImage}
                accept="image/jpeg, image/png"
                ref={inputOpenImageRef}
                type="file"
            />
        </div>
    );
}

export default UserPanel;

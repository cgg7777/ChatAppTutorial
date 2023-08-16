import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
function UserPanel() {
    const user = useSelector((state) => state.user.currentUser);
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth);
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
                        user name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default UserPanel;

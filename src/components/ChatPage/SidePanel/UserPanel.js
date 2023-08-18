import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import mime from "mime-types";
import { getDatabase, set, update } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setPhotoURL } from "../../../redux/actions/user_action";
function UserPanel() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
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
        const auth = getAuth();
        const user = auth.currentUser;
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `user_image/${user.uid}`);
            const uploadTaskSnapshot = await uploadBytes(storageRef, file, metaData);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
            console.log(downloadURL);
            await updateProfile(user, {
                photoURL: `${downloadURL}`,
            });

            dispatch(setPhotoURL(downloadURL));
            const db = getDatabase();
            console.log("users/" + user.uid);
            set(ref(db, "users/" + user.uid), {
                photoURL: downloadURL,
            });
            // const updates = {};
            // updates[`users/${user.uid}/photoURL`] = downloadURL;
            // const db = getDatabase();
            // update(ref(db), updates);
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
            <input style={{ display: "none" }} onChange={handleUploadImage} accept="image/jpeg, image/png" ref={inputOpenImageRef} type="file" />
        </div>
    );
}

export default UserPanel;

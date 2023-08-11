import React from "react";
import { Link } from "react-router-dom";
function RegisterPage() {
    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Register</h3>
            </div>
            <form>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                {/* register your input into the hook by invoking the "register" function */}
                <label>Email</label>
                <input name="email" type="email" />
                <label>Name</label>
                <input name="name" />
                <label>Password</label>
                <input name="password" type="password" />
                <label>Password Confirm</label>
                <input name="passwordConfirm" type="password" />
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <p>This field is required</p>} */}

                <input type="submit" />
                <Link style={{ color: "gray", textDecoration: "none" }} to="login">
                    이미 아이디가 있다면
                </Link>
            </form>

            {/* </form> */}
        </div>
    );
}

export default RegisterPage;

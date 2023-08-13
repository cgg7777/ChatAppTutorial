import { firebase } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function LoginPage() {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [errorFromSubmit, setErrorFromSubmit] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(firebase, data.email, data.password);
            setLoading(false);
        } catch (error) {
            setErrorFromSubmit(error.message);
            setLoading(false);
            setTimeout(() => {
                setErrorFromSubmit("");
            }, 5000);
        }
    };
    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Login</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && errors.email.type === "required" && <p>This field is required</p>}
                {errors.email && errors.email.type === "pattern" && <p>Email pattern is not sutible</p>}

                <label>Password</label>
                <input type="password" {...register("password", { required: true, minLength: 6 })} />
                {errors.password && errors.password.type === "required" && <p>This field is required</p>}
                {errors.password && errors.password.type === "minLength" && (
                    <p>Password must have at least 6 characters</p>
                )}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input value="SUBMIT" type="submit" disabled={loading} />
                <Link style={{ color: "gray", textDecoration: "none" }} to="register">
                    아이디가 없다면...
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;

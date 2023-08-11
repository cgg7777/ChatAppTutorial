import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function RegisterPage() {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm();

    console.log(watch("email"));

    const password = useRef();
    password.current = watch("password");

    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Register</h3>
            </div>
            <form>
                <label>Email</label>
                <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && errors.email.type === "required" && <p>This field is required</p>}
                {errors.email && errors.email.type === "pattern" && <p>Email pattern is not sutible</p>}

                <label>Name</label>
                <input {...register("name", { required: true, maxLength: 10 })} />
                {errors.name && errors.name.type === "required" && <p>This field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>Input exceed maximum</p>}

                <label>Password</label>
                <input type="password" {...register("password", { required: true, minLength: 6 })} />
                {errors.password && errors.password.type === "required" && <p>This field is required</p>}
                {errors.password && errors.password.type === "minLength" && (
                    <p>Password must have at least 6 characters</p>
                )}

                <label>Password Confirm</label>
                <input
                    type="password"
                    {...register("passwordConfirm", {
                        required: true,
                        validate: (value) => value === password.current,
                    })}
                />
                {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <p>This field is required</p>}
                {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && <p>Password do not match</p>}

                <input type="submit" />
                <Link style={{ color: "gray", textDecoration: "none" }} to="login">
                    이미 아이디가 있다면
                </Link>
            </form>
        </div>
    );
}

export default RegisterPage;

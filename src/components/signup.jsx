import React, { useState } from 'react';
import mainImg from '../assets/codeit-logo.png';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utilities/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../utilities/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validatePassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const register = (e) => {
        e.preventDefault();
        if (validatePassword(formData.password, formData.confirmPassword)) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(async (res) => {
                    const docRef = await addDoc(collection(db, "users"), {
                        name: formData.name,
                        email: res.user.email,
                        tier: "free",
                        uid: res.user.uid,
                    });
                    alert("User Created Successfully. Please Login to continue");
                    navigate("/login");
                })
                .catch((err) => alert("Registration Failed"));
        } else {
            alert("Passwords do not match");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                const docRef = await addDoc(collection(db, "users"), {
                    name: user.displayName,
                    email: user.email,
                    tier: "free",
                    uid: user.uid,
                });
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log("Error during Google Sign In:", error.message);
                alert("Failed to sign in with Google");
            });
    };

    return (
        <div className='signup-mainbody flex signup-root'>
            <div className='signup-image-container flex'>
                <div className='signup-image-title'>
                    <h2>Start Scripting Your Success Story with</h2>
                </div>
                <div>
                    <img src={mainImg} className="main-img" alt="Main Background" />
                </div>
            </div>
            <div className="signup-container">
                <h2 className='signup-title'>Create your account</h2>
                <div className='signup-form'>
                    <form onSubmit={register} className="flex">
                        <div className='form-el'>
                            <label htmlFor="name">Name:</label>
                            <input
                                placeholder='Enter your Name'
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='form-el'>
                            <label htmlFor="email">Email Address:</label>
                            <input
                                placeholder='Enter Your Email address'
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='form-el'>
                            <label htmlFor="password">Password:</label>
                            <input
                                placeholder='Create a strong password'
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='form-el'>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                placeholder='Re-Enter your password'
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button className="signup-btn" type="submit">SignUp</button>
                    </form>
                    <h4 className='or'> or </h4>
                    <div className='google-btn'>
                        <button className='flex' onClick={handleGoogleSignIn}>
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                                {/* Google SVG Paths */}
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

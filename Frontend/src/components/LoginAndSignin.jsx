import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Button, Input } from "./index";

function AuthPage() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        profileImage: null,
        fullname: "",
        username: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("data", formData);
        // setError("");
        
        

        try {
            if (isRightPanelActive) {
                // Sign Up logic
                console.log("hi")
                const userData = await authService.createAccount({
                    ...formData,
                    profileImage: formData.profileImage,
                });
                console.log("h2")
                console.log(userData);
                if (userData) {
                    const userData = await authService.getCurrentUser();
                    if (userData) dispatch(authLogin({ userData }));
                    setIsRightPanelActive(false);
                    navigate("/home");
                }
                setIsRightPanelActive(false);
            } else {
                // Sign In logic
                const session = await authService.login({
                    email: formData.email,
                    password: formData.password,
                });
                if (session) {
                    const userData = await authService.getCurrentUser();
                    if (userData) dispatch(authLogin({ userData }));
                    navigate("/home");
                }
            }
        } catch (error) {
            // setError(error.message);
            setIsRightPanelActive(false);
        }
        window.location.reload();
    };

    const toggleOverlay = () => {
        setIsRightPanelActive(!isRightPanelActive);
    };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleAuth}>
                    <h1>Create Account</h1>
                    <Input
                        label="Profile Image:"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        name="profileImage"
                        onChange={handleChange}
                    />
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Username:"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </div>

            <div className="form-container sign-in-container">
                <form onSubmit={handleAuth}>
                    <h1>Sign In</h1>
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
            </div>

            <div className="overlay-container" id="overlayCon">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <Button className='border border-custom-yellow' onClick={toggleOverlay}>Sign In</Button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <Button className='border border-custom-yellow' onClick={toggleOverlay}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

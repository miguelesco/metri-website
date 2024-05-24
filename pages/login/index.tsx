import React, { useState } from "react";
import LoginUI from "@layouts/components/loginUI";
import { useRouter } from 'next/router';
import { loginUser, registerUser } from "@lib/utils/API/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        const {error, data} = await loginUser({ email, password })
        if (error) {
            setError(error);
        } else if (data) {
            // Assuming you want to store the JWT in localStorage
            localStorage.setItem('jwt', data.token);
            router.push('/dashboard');
        }
    };

    const handleRegister = async () => {
        const {error, data} = await registerUser({ email, password, confirmPassword });
        if (error) {
            setError(error);
        } else if (data) {
            // Assuming you want to store the JWT in localStorage
            localStorage.setItem('jwt', data.token);
            router.push('/dashboard');
        }
    };

    const handleSubmit = async () => {
        setError(null); // Clear previous errors
        if (isRegister) {
            await handleRegister();
        } else {
            await handleLogin();
        }
    };
    return (
        <LoginUI 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}

        />
    )
}

export default Login;
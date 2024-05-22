import React, { useState } from "react";
import LoginUI from "@layouts/components/loginUI";
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                    },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming you want to store the JWT in localStorage
                localStorage.setItem('jwt', data.token);
                // Redirect to a protected route or homepage
                router.push('/dashboard');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                        password_confirmation: confirmPassword,
                    },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('dataLogin', data)
                // Assuming you want to store the JWT in localStorage
                localStorage.setItem('jwt', data.token);
                // Redirect to a protected route or homepage
                router.push('/dashboard');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
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
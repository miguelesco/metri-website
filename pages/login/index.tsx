import React, { useState } from "react";
import LoginUI from "@layouts/components/loginUI";
import { login, register } from "@lib/firebase/config";
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // Execute your login logic here
        // You can access the email and password variables here
        const res = await login(email, password);
        console.log(res)
        if (res?.user.uid) {
            const jwt = await res.user.getIdToken();
            localStorage.setItem('jwt', jwt);
            router.push('/dashboard');
        }
    };
    return (
        <LoginUI 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
        />
    )
}

export default Login;
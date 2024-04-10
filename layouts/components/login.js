import React, { useState } from "react";
import { register } from "@lib/firebase/config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Execute your login logic here
        // You can access the email and password variables here
        register(email, password);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-4" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl text-center">Login</h3>
                    <p className="text-sm text-muted-foreground text-center">Enter your email and password to log in.</p>
                </div>
                <div className="p-6 space-y-4 px-4 py-6">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            placeholder="Email"
                            required=""
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="password"
                            required=""
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center p-4">
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Login;
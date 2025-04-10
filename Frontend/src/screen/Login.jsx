import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/users/login', {
            email,
            password
        })
            .then(() => {
                console.log('Login Successfull');
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
        
        console.log('Email:', email, 'Password:', password);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a] relative overflow-hidden">
            {/* Shadow aura background */}
            <div className="absolute w-[500px] h-[500px] bg-[#38bdf8] opacity-20 blur-3xl rounded-full animate-pulse"></div>
            <div className="z-10 bg-[#1e293b] p-8 rounded-lg shadow-2xl w-full max-w-md border border-[#38bdf8] relative aura-glow">
                <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-[0_0_10px_#38bdf8] tracking-wide">
                    Shadow Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-[#334155] rounded-md bg-[#0f172a] text-white focus:outline-none focus:border-[#38bdf8] placeholder-gray-500"
                            placeholder="hunter@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-[#334155] rounded-md bg-[#0f172a] text-white focus:outline-none focus:border-[#38bdf8] placeholder-gray-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-white hover:bg-[#38bdf8] text-[#0f172a] font-semibold rounded-md transition-all duration-300 shadow-[0_0_20px_#38bdf8] hover:shadow-[0_0_30px_#38bdf8] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#1e293b]"
                    >
                        Enter the Gate
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-[#94a3b8]">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#38bdf8] hover:text-white font-semibold">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

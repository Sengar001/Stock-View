import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

const RegisterForm = ({ onSubmit, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        onSubmit(email, password);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-10"
                        placeholder="you@example.com"
                        disabled={loading}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field pl-10"
                        placeholder="••••••••"
                        disabled={loading}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                    </div>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field pl-10"
                        placeholder="••••••••"
                        disabled={loading}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex justify-center py-2 px-4"
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
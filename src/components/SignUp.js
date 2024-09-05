import React, { useState } from 'react';

const SignUp = ({ toggleSignUp }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await response.json();

            if (response.ok) {
                toggleSignUp(); // Retour au formulaire de connexion après la création de compte
            } else {
                setError(data.message || 'Erreur lors de la création du compte');
            }
        } catch (error) {
            setError('Erreur lors de la création du compte');
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn px-4 py-2 bg-light text-dark fw-bold">Register</button>
            <button type="button" onClick={toggleSignUp} className="btn m-2 px-4 py-2 bg-secondary text-light">Back</button>
        </form>
    );
};

export default SignUp;

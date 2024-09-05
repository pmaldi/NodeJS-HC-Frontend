import React, { useState, useContext } from 'react';
import DataContext from '../context/dataContext';
import SignUp from './SignUp'; // Importation du composant SignUp

const Start = () => {
    const { startQuiz, showStart } = useContext(DataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false); // Gestion de l'affichage du formulaire de création de compte
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                startQuiz();
            } else {
                setError(data.message || 'Erreur de connexion');
            }
        } catch (error) {
            setError('Erreur de connexion');
        }
    };

    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1 className='fw-bold mb-4'>Le Quiz</h1>

                        {showSignUp ? (
                            <SignUp toggleSignUp={toggleSignUp} />
                        ) : (
                            <>
                                <form onSubmit={handleLogin}>
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
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <div className="text-danger mb-3">{error}</div>}
                                    <button type="submit" className="btn px-4 py-2 bg-light text-dark fw-bold">Login</button>
                                    <button onClick={toggleSignUp} className="btn m-2 px-4 py-2 bg-light text-dark fw-bold">Register</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;

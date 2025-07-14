import React, { useState } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { login } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/style.css';

interface Props {}

const Login: React.FC<Props> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useAppSelector(state => state.auth);

    React.useEffect(() => {
        if (token) {
            navigate('/dashboard/projects');
        }
    }, [token, navigate]);

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <div className="animated-bg">
            <Card className="login-card align-items-center">
            <img src="/pub/logo.png" alt="Logo" className="logo" />
                <Form className="w-100 mt-5" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-envelope"></i>
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative" controlId="formPassword">
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-lock"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <InputGroup.Text
                                className="show-password-toggle"
                                onClick={togglePassword}
                                role="button"
                                tabIndex={0}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', paddingRight: 0 }}
                            >
                                <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    {error && <div className="text-danger mb-2">{error}</div>}
                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
               
                <Link to="/our-research" className="mt-5 w-100">
                        Go to Public Web
                    </Link>
        </Card>
      </div>
    );
};

export default Login;
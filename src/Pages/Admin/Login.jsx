import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (role) => {
    const { username, password } = formData;

    if (!username || !password) {
      setError('⚠️ Both fields are required!');
      return;
    }

    if (role === 'admin' && username === 'admin' && password === 'password123') {
      localStorage.setItem('role', 'admin');
      navigate('/');
    } else if (role === 'user' && username === 'user' && password === 'user123') {
      localStorage.setItem('role', 'user');
      navigate('/userhome');
    } else {
      setError('❌ Invalid username or password.');
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <Card className="Card-login d-flex align-items-center p-2 border-0  shadow-sm rounded-4">
        <div className="text-center mb-2">
          <h2 style={{ color: 'red', fontWeight: 'bold', letterSpacing: "2" }}>EMR</h2>
          <h1 style={{  fontWeight: "500 ",color:"#2D9AE5"}}>APPLIED</h1>
        </div>

        <h5 className="text-center " style={{ color: '#2D9AE5' }}>Login</h5>
        {error && <p className="text-danger text-center mb-1">{error}</p>}
        <Form>
          <Form.Group className="d-flex mb-3 mt-4">
            <Form.Control
              type="text"
              name="username"
              placeholder="Email"
              value={formData.username}
              onChange={handleChange}
              className="rounded"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded"
            />
          </Form.Group>
          <div className="d-flex justify-content-between gap-2">
            <Button variant="primary" className="w-100" onClick={() => handleLogin('admin')}>
              Admin
            </Button>
            <Button variant="primary" className="w-100" onClick={() => handleLogin('user')}>
              User
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;

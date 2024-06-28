import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSpring, animated } from 'react-spring';

const Login = () => {
    const [form, setForm] = useState({ fullName: '', password: '' });
    const [error, setError] = useState('');

    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const paperAnimation = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        config: { duration: 500 }
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful', data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <Grid>
            <animated.div style={paperAnimation}>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name='fullName'
                            label='Username'
                            placeholder='Enter username'
                            variant="standard"
                            fullWidth
                            required
                            value={form.fullName}
                            onChange={handleChange}
                        />
                        <TextField
                            name='password'
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            variant="standard"
                            fullWidth
                            required
                            value={form.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="remember"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                            Sign in
                        </Button>
                        {error && <Typography color='error'>{error}</Typography>}
                        <Typography>
                            <Link href="#">
                                Forgot password ?
                            </Link>
                        </Typography>
                        <Typography>
                            Do you have an account ?
                            <Link href="#">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </animated.div>
        </Grid>
    );
};

export default Login;

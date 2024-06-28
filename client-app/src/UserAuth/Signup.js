import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Link } from '@mui/material';

const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
    const marginTop = { marginTop: 5 };

    const [inputs, setInputs] = useState({
        fullName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
        profilePic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePic') {
            setInputs({
                ...inputs,
                profilePic: files[0],
            });
        } else {
            setInputs({
                ...inputs,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('fullName', inputs.fullName);
            formData.append('phoneNumber', inputs.phoneNumber);
            formData.append('password', inputs.password);
            formData.append('confirmPassword', inputs.confirmPassword);
            formData.append('gender', inputs.gender);
            formData.append('profilePic', inputs.profilePic);

            const result = await axios.post("http://localhost:5000/api/auth/signup", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Signup successful');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <Grid className='col'>
            <Paper style={paperStyle} id="paper">
                <Grid align='center'>
                    <Typography variant='caption' gutterBottom>
                        Please fill this form to create an account!
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Full Name'
                        placeholder="Enter your name"
                        name="fullName"
                        value={inputs.fullName}
                        onChange={handleChange}
                        style={marginTop}
                    />
                    <TextField
                        fullWidth
                        label='Phone'
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={inputs.phoneNumber}
                        onChange={handleChange}
                        style={marginTop}
                    />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={inputs.gender}
                            onChange={handleChange}
                            style={{ display: 'initial' }}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label='Password'
                        placeholder="Enter your password"
                        type='password'
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        style={marginTop}
                    />
                    <TextField
                        fullWidth
                        label='Confirm Password'
                        placeholder="Confirm your password"
                        type='password'
                        name="confirmPassword"
                        value={inputs.confirmPassword}
                        onChange={handleChange}
                        style={marginTop}
                    />
                    <input
                        type="file"
                        name="profilePic"
                        onChange={handleChange}
                        style={marginTop}
                    />
                    <p>Already have an account? <Link href="#">Sign In</Link></p>
                    <Button type='submit' variant='contained' color='primary' fullWidth>
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default Signup;

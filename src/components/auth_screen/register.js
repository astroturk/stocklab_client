import React, { useRef, useState } from 'react'
import { useHistory } from "react-router-dom"
import { AppBar, Container, Grid, Typography, Toolbar, Button, Box, Divider } from '@material-ui/core'
import { FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core' 
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'

import { useAuth } from '../../context/AuthContext'

import './styles/register.css'
import Footer from '../components/footer/footer'

function Register() {
    const { register } = useAuth()
    let history = useHistory()

    const usernameRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailAddressRef = useRef()
    const birthdayRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [error, setError] = useState('')
    const [inputError, setInputError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    function validateData(data) {
        if (data.username.length < 5){
            setError('Please chose a longer username')
            setInputError(true)
            setButtonDisabled(false)
            return false
        }
        if (data.emailAddress.length === '' || data.firstName === '' || data.lastName === '' || data.birthday === ''){
            setError('Please fill all the fields')
            setInputError(true)
            setButtonDisabled(false)
            return false
        }
        if (data.password.length < 6){
            setError('Please choose a longer password')
            setInputError(true)
            setButtonDisabled(false)
            return false
        }
        if (data.password !== data.confirmPassword){
            setError('The passwords don\'t match')
            setInputError(true)
            setButtonDisabled(false)
            return false
        }

        return true
    }

    async function submit(){
        setButtonDisabled(true)
        setInputError(false)
        setError('')
        const data = {
            username: usernameRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            emailAddress: emailAddressRef.current.value,
            birthday: birthdayRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        }
        if (validateData(data)){
            try {
                await register(data)
                setInputError(false)
                setError('')
                setButtonDisabled(false)
                history.push('./login')
            } catch(error) {
                setInputError(true)
                setError(error.message)
                setButtonDisabled(false)
            }
            /*axios({
                method: 'post',
                data: data, 
                withCredentials: true,
                url: 'http://localhost:4000/register/email'
            })
            .then(res => {
                console.log(res)
                if (res.data === 'User already exists'){
                    setError('Username already exists')
                    setInputError(true)
                }
                else {
                    setError('')
                    setInputError(false)
                    history.push('/dashboard')
                }
                setButtonDisabled(false)
            })
            .catch((err) => {
                console.log(err)
                setError('Please try again')
                setInputError(true)
                setButtonDisabled(false)
            })*/
        }
    }

    return (
        <Container className='registerContainer' maxWidth={false} disableGutters={true}>
            <AppBar className='appBar' position='static' color='inherit'>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box paddingTop="3px">
                                <Typography className='appBarTitle' variant='h4' color='primary'>
                                    StockLabs!
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box paddingTop="10px">
                                <Grid container spacing={2} direction={'row-reverse'}>
                                    <Link>
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> Creator </Button>
                                    </Grid>
                                    </Link>
                                    <Link >
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> About Us </Button>
                                    </Grid>
                                    </Link>
                                    <Link to='/auth/login'>
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> Login </Button>
                                    </Grid>
                                    </Link>
                                    <Link to='/'>
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> Home </Button>
                                    </Grid>
                                    </Link>
                                </Grid>
                            </Box>                            
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Divider className='appBarDivider'/>
            <Box className='registerSubContainer' align='center' display='flex' flexDirection='row' justifyContent='center'>
                <Box className='registerFormContainer' paddingTop='80px'>
                    <Typography variant='h1' color='primary'>
                        Register
                    </Typography>
                    <Box height='30px'/>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel>Username</InputLabel>
                        <Input inputRef={usernameRef} id="username-input" aria-describedby="username-helper-text" />
                        <FormHelperText id="username-helper-text">Username should be atleast 8 characters long</FormHelperText>
                    </FormControl>
                    <Box height='10px'/>
                    <Box display='flex' flexDirection='row'>
                        <FormControl fullWidth={true} color='primary'>
                            <InputLabel >First Name</InputLabel>
                            <Input inputRef={firstNameRef} id="first-name-input" />
                        </FormControl>
                        <Box width='50px'/>
                        <FormControl fullWidth={true} color='primary'>
                            <InputLabel >Last Name</InputLabel>
                            <Input inputRef={lastNameRef} id="last-name-input"/>
                        </FormControl>
                    </Box>
                    <Box height='20px'/>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel >Email address</InputLabel>
                        <Input inputRef={emailAddressRef} id="email-input" aria-describedby="email-helper-text"/>
                        <FormHelperText id="email-helper-text">Please enter a valid Email</FormHelperText>
                    </FormControl>
                    <Box height='20px'/>
                    <TextField inputRef={birthdayRef} color='primary' id="date-input" label="Birthday" type="date"fullWidth={true} InputLabelProps={{shrink: true,}}/>
                </Box>
                <Box height='45vh' paddingLeft='20px' paddingRight='20px' paddingTop='210px' paddingBottom='100px'>
                    <Divider  orientation='vertical' variant='middle'/>
                </Box>
                <Box className='registerFormContainer' paddingTop='225px'>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel >Password</InputLabel>
                        <Input inputRef={passwordRef} id="password-input" type='password'/>
                    </FormControl>
                    <Box height='30px'/>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel>Confirm Password</InputLabel>
                        <Input inputRef={confirmPasswordRef} id="confirm-password-input" type='password'/>
                    </FormControl>
                    <Box height='30px'/>
                    <Box width='400px'>
                        <Button disabled={buttonDisabled} onClick={submit} variant='contained' size='medium' startIcon={<FaEnvelope/>} fullWidth={true} style={{justifyContent: "flex-start"}}>
                            Register with Email and Password
                        </Button>
                        <Box height='20px'/>
                        {inputError && <Alert severity="error" >{error}</Alert>}
                    </Box>
                </Box>
            </Box>
            <Footer/>
        </Container>
    )
}

export default Register

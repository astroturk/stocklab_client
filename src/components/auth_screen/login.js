import React, { useRef, useState } from 'react'
import { useHistory } from "react-router-dom"
import { AppBar, Container, Grid, Typography, Toolbar, Button, Box, Divider } from '@material-ui/core'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import { Alert } from '@material-ui/lab' 
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'

import { useAuth } from '../../context/AuthContext'

import './styles/login.css'
import Footer from '../components/footer/footer'

function Login() {
    const { login } = useAuth()
    var history = useHistory()

    const usernameRef = useRef()
    const passwordRef = useRef()
    const [inputError, setInputError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [error, setError] = useState('')

    function validateData(data){
        if (data.username.length < 5){
            setInputError(true)
            setError('Please enter a valid Username')
            setButtonDisabled(false)
            return false
        }
        if (data.password.length < 5){
            setInputError(true)
            setError('Please enter a valid Password')
            setButtonDisabled(false)
            return false
        }
        return true
    }

    async function submit() {
        setButtonDisabled(true)
        setInputError(false)
        setError('')
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        if (validateData(data)) {
            try {
                await login(data)
                setInputError(false)
                setError('')
                setButtonDisabled(false)
                history.push('../dashboard')
            } catch (error) {
                setInputError(true)
                setError(error.message)
                setButtonDisabled(false)
            }
        }
    }

    return (
        <Container className='loginContainer' maxWidth={false} disableGutters={true}>
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
                                    <Link to='/auth/register'>
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> Registration </Button>
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
            <Box className='loginSubContainer' align='center'>
                <Box className='loginFormContainer' paddingTop='80px'>
                    <Typography variant='h1' color='primary'>
                        Login
                    </Typography>
                    <Box height='30px'/>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel>Username</InputLabel>
                        <Input inputRef={usernameRef} id="username-input" />
                    </FormControl>
                    <Box height='20px'/>
                    <FormControl fullWidth={true} color='primary'>
                        <InputLabel>Password</InputLabel>
                        <Input inputRef={passwordRef} id="password-input" type='password'/>
                    </FormControl>
                    <Box height='40px'/>
                    <Box width='400px'>
                        <Button onClick={submit} disabled={buttonDisabled} variant='contained' size='medium' startIcon={<FaEnvelope/>} fullWidth={true} style={{justifyContent: "flex-start"}}>
                            Login with Username and Password
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

export default Login

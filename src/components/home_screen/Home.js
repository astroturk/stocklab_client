import React from 'react'
import { AppBar, Container, Grid, Typography, Toolbar, Button, Box, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Footer from '../components/footer/footer'

import './Home.css'
import '../styles/appBar.css'

import sphereMulti from './components/sphere_multi.png'
import sphereWhite from './components/sphere_white.png'


function Home() {
    return (
        <Container className='homeContainer' maxWidth={false} disableGutters={true}>
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
                                    <Link to='/auth/login'>
                                    <Grid item>
                                        <Button className="appBarButton" size="large"> Login </Button>
                                    </Grid>
                                    </Link>
                                </Grid>
                            </Box>                            
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Divider className='appBarDivider'/>
            <Container maxWidth={false}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <div className="homeImage1">
                            <img src={sphereMulti} alt='Sphere'/>
                        </div>
                        <div className="homeImage2">
                            <img src={sphereWhite} alt='Sphere'/>
                        </div>
                        <div className="homeImage3">
                            <img src={sphereWhite} alt='Sphere'/>
                        </div>
                    </Grid>
                    <Grid item xs={12}sm={6}>
                        <Box className='homeSubContainerText'>
                            <Typography className="textTop" variant='h1' color="primary" >
                                Thinking Stocks?
                            </Typography>
                            <Typography className="textBottom" variant='h1' color="secondary" >
                                Think StockLabs!
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </Container>
    )
}

export default Home

import React, { useRef } from 'react'
import { AppBar, Container, Grid, Typography, Box, Divider, Button, TextField } from '@material-ui/core'
import { InputAdornment, IconButton } from '@material-ui/core'
import { useAuth } from '../../context/AuthContext'
import { useData } from './context/DataContext'

import './dashboard.css'
import Footer from '../components/footer/footer'
import { Route, Switch, useHistory } from 'react-router'
import { Search, AccountCircle, ExitToApp  } from '@material-ui/icons'


import NewsTab from './tabs/newsTab'
import NotesTab from './tabs/notesTab'
import StockTab from './tabs/stockTab'
import SearchTab from './tabs/searchTab'
import ProfileTab from './tabs/profileTab'

function Dashboard() {
    let history = useHistory()
    let { fetchSearchData, updateStockData, fetchStockNews, getUserImage, fetchNotes } = useData()
    let { currentUser, logout } = useAuth()
    const searchQueryRef = useRef('')
    

    async function handleLogout(){
        try {
            await logout()
            history.replace('../auth/login')
        } catch (error) {
            console.log('Could not logout user')
        }
    }

    async function handleSearchNews(){
        fetchSearchData(searchQueryRef.current.value)
    }

    function handleStockData(){
        updateStockData()
        history.replace('/dashboard/stocktab')
    }

    function handleStockNews(){
        fetchStockNews()
        history.replace('/dashboard/newstab')
    }

    function handleProfile(){
        getUserImage()
        history.replace('/dashboard/profiletab')
    }

    function handleNotes(){
        fetchNotes()
        history.replace('/dashboard/notestab')
    }

    return (
        <Container className='dashboardContainer' maxWidth={false} disableGutters={true}>
            <AppBar className='appBar' position='static' color='inherit'>
                <Grid container>
                    <Grid item xs={3}>
                        <Box paddingTop="3px" paddingLeft='10px'>
                            <Typography className='appBarTitle' variant='h4' color='primary'>
                                Dashboard
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box height='5px'></Box> 
                        <TextField inputRef={searchQueryRef} size='small' variant='outlined' fullWidth={true} 
                            onClick={() => {history.replace('/dashboard/searchtab')}}
                            InputProps={{endAdornment: (<InputAdornment><IconButton onClick={ handleSearchNews }><Search /></IconButton></InputAdornment>)}}/> 
                    </Grid>
                    <Grid item xs={5}>
                        <Box height='50px' width='inherit' display='flex' flexDirection='row-reverse'>
                            <IconButton onClick={handleLogout}>    
                                <ExitToApp/>
                            </IconButton>
                            <IconButton onClick={handleProfile}>    
                                <AccountCircle/>
                            </IconButton>
                            <Box height='auto' paddingTop='8px' paddingLeft='30px' paddingRight='20px'>
                                <Typography variant='h6'color='primary'>
                                    Hi {currentUser.firstName}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
            <Divider className='appBarDivider'/>
            <Box className='dashboardSubContainer' align='center' height='auto' display='flex' flexDirection='row'>
                <Box width='160px' bgcolor='secondary.main'>
                    <Box height='10px' />
                    <Button size='large' fullWidth={true} onClick={ handleStockNews }>News Feed</Button>
                    <Button size='large' fullWidth={true} onClick={ handleStockData }>Stock Tab</Button>
                    <Button size='large' fullWidth={true} onClick={ handleNotes }>Notes Tab</Button>
                </Box>
                <Switch>
                    <Route exact path='/dashboard/newstab'>
                        <NewsTab/>
                    </Route>
                    <Route exact path='/dashboard/notestab'>
                        <NotesTab/>
                    </Route>
                    <Route exact path='/dashboard/stocktab'>
                        <StockTab/>
                    </Route>
                    <Route exact path='/dashboard/searchtab'>
                        <SearchTab/>
                    </Route>
                    <Route exact path='/dashboard/profiletab'>
                        <ProfileTab/>
                    </Route>
                </Switch>
            </Box>
            <Footer/>
        </Container>
    )
}

export default Dashboard

import React, { useRef } from 'react'
import { Container, Input, Box, Button, CardMedia, Card, makeStyles, Typography
} from '@material-ui/core'
import { useData } from '../context/DataContext.js'
import { useAuth } from '../../../context/AuthContext'
import profileDefault from './profile_default.png'

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      minWidth: 400,
      minHeight: 400,
      maxHeight: 400,
    },
});

function ProfileTab() {
    const classes = useStyles()
    const userImageRef = useRef()
    const { postUserImage, profileImage }  = useData()
    const { currentUser } = useAuth()

    function handleSubmit(){
        console.log('Hangle submit triggered')
        postUserImage(userImageRef.current.files[0])
    }

    return (
        <Container disableGutters={true} maxWidth={false}>
            <Box height='inherit' width='inherit' display='flex' flexDirection='row'>
                <Box padding='20px' display='flex' flexDirection='column'>
                    <Card className={classes.root}>
                    <CardMedia>
                        <img style={{height: '400px', width: '400px', objectFit:'contain'}}src={ profileImage ? profileImage : profileDefault } alt='profile'/>
                    </CardMedia>
                    </Card>
                    <Box height='10px'/>
                    <Input type='file' inputRef={userImageRef} disableUnderline={true} name='profileImage'/>
                    <Box height='10px'/>
                    <Button size='small' variant='contained' onClick={handleSubmit}> Upload User Image</Button>
                </Box>
                <Box padding='20px' display='flex' flexDirection='column' alignItems='flex-start'>
                    <Box height='10px'/>
                    <Typography color='primary' variant='h3'>
                        {currentUser.firstName + ' ' + currentUser.lastName}
                    </Typography>
                    <Box height='5px'/>
                    <Typography color='primary' style={{ fontSize: '30px'}}>
                        {currentUser.username}
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default ProfileTab

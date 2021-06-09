import React, { useState, useRef } from 'react'
import { Container, Grid, Card, CardContent, Box, TextField, Typography, makeStyles, IconButton, Fab, CardActions } from '@material-ui/core'
import { Add, Save } from '@material-ui/icons'
import NotesCard from '../components/NotesCard'

import { useData } from '../context/DataContext'

const useStyles = makeStyles({
    input: {
        fontSize: 14,
        color: 'white'
    }
})

function NotesTab() {
    const { notesList, setNotesList, saveNotes } = useData()
    const classes = useStyles()
    const [charLeft, setCharLeft]  = useState(250)
    const noteForm = useRef()

    function handleAddNote(){
        console.log(noteForm.current.value)
        setNotesList(prev => [ ...prev, noteForm.current.value ])
        noteForm.current.value = ''
        setCharLeft(250)
    }

    function handleSaveNotes(){
        console.log('Save notes triggered')
        saveNotes()
    }

    function removeAtIndex(index){
        console.log(index)
        setNotesList(notesList.filter((item, i) => i !== index))
    }

    return (
        <Container maxWidth={false} disableGutters={true}>
            <Grid container>
                <Box paddingTop='20px' paddingLeft='20px'>
                <Card style={{backgroundColor: '#606060', paddingBottom:'0px'}}>
                    <CardContent>
                        <Box width='350px' height='150px' display='flex' flexDirection='column' alignItems='flex-start'>
                            <Typography variant='subtitle1'>New Note</Typography>
                            <Box height='inherit' width='inherit'>
                                <TextField inputRef={noteForm} placeholder='Description'
                                    multiline rows={7} fullWidth={true} size='small'
                                    InputProps={{ disableUnderline: true, classes:{input: classes.input} }}
                                    onChange={() => { setCharLeft(Math.max(250 - noteForm.current.value.length, 0))}}/>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions >
                        <Box paddingLeft='10px' paddingRight='10px' paddingBottom='3px' width='350px'>
                        <Grid container justify='space-between' alignItems='center'>
                            <Box paddingTop='10px'>
                            <Typography variant='subtitle1'>{charLeft}</Typography>
                            </Box>
                            <Box width='200px' display='flex' flexDirection='row-reverse'>
                                <Fab variant='extended' onClick={ handleSaveNotes } sizeSmall >
                                    <Save/>
                                </Fab>
                                <Box paddingRight='10px'>
                                <IconButton onClick={ handleAddNote }>
                                    <Add/>
                                </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        </Box>
                    </CardActions>
                </Card>
                </Box>
                {notesList.map((data, index) => <NotesCard text={data} key={data} onDelete={() => removeAtIndex(index)}/>)}
            </Grid>
            <Box height='30px'/>
        </Container>
    )
}

export default NotesTab

// <Button onClick={ handleSaveNotes } variant='contained' size='small'>Add Note</Button>
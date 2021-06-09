import React from 'react'
import { Box, Card, CardContent, Typography, IconButton, CardActions } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

function NotesCard({ text, onDelete }) {
    return (
        <Box paddingTop='20px' paddingLeft='20px'>
            <Card>
                <CardContent>
                    <Box width='350px' height='150px' display='flex' flexDirection='column'>
                        <Box height='inherit'>
                        <Typography variant='body2' align='justify'>
                            {text}
                        </Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>  
                    <Box paddingLeft='10px' paddingRight='10px' paddingBottom='3px' width='350px' display='flex' flexDirection='row-reverse' width='inherit'>
                        <IconButton onClick={ onDelete }>
                            <Delete/>
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default NotesCard

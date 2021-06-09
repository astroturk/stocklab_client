import React from 'react'
import { Box, Typography } from '@material-ui/core'

import './footer.css'

function Footer() {
    return (
        <Box className='footer' align='center' display='flex' flexDirection='column-reverse' paddingBottom='10px'>
            <Typography color='primary'>
                Facebook | Instagram | Snapchat
            </Typography>
            <Typography color='primary'>
                © Eshan Trehan
            </Typography>
        </Box>
    )
}

export default Footer

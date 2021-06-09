import React from 'react'
import { Container, Grid, Box, Typography } from '@material-ui/core'
import NewsCard from '../components/NewsCard'

import { useData } from '../context/DataContext'

function NewsTab() {
    const { stockNewsData } = useData()

    let uniqueNews = [...new Set(stockNewsData)]
    return (
        <Container disableGutters={true} maxWidth={false}>
            <Box width='inherit' paddingTop='10px' display='flex' flexDirection='row' justifyContent='flex-start'/>
                <Typography variant='h3' color='primary'>
                    Custom News Feed
                </Typography>
                <Typography variant='body1' color='primary'>
                    Based on the stocks you are watching
                </Typography>
            <Box/>
            <Grid container>
                { uniqueNews.map(data => <NewsCard data={data}/>) }
            </Grid>
            <Box height='30px'/>
        </Container>
    )
}

export default NewsTab

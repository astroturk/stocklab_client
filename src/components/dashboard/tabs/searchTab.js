import React from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import NewsCard from '../components/NewsCard'
import { useData } from '../context/DataContext'

function SearchTab() {
    let { searchData, loadingSearchData } = useData()

    return (
        <Container disableGutters={true} maxWidth={false}>
            <Grid container>
                { !loadingSearchData && searchData.map(data => <NewsCard data={data}/>) }
            </Grid>
            <Box height='30px'/>
        </Container>
    )
}

export default SearchTab

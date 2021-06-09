import React, { useRef } from 'react'
import { Container, Box, TextField, Typography, Button, Grid } from '@material-ui/core'

import { useData } from '../context/DataContext'
import StockCard from '../components/StockCard'

function StockTab() {
    const stockSymbolRef = useRef('')
    const { addStockSymbol, stockData } = useData()
    
    function handleSymbolSubmit(){
        const symbol = stockSymbolRef.current.value
        if(symbol.length === 0) return 
        addStockSymbol(symbol)
    }

    console.log(stockData)
    return (
        <Container disableGutters={true} maxWidth={false}>
            <Box height='auto' width='auto'  display='flex' flexDirection='row' paddingTop='20px' paddingLeft='50px'>
                <Box paddingTop='4px'><Typography variant='h5' color='primary'>Symbol</Typography></Box>
                <Box width='20px'/>
                <TextField inputRef={stockSymbolRef} variant='outlined' size='small'/>
                <Box width='20px'/>
                <Button variant='contained' onClick={handleSymbolSubmit}>Add Symbol</Button>
            </Box>
            <Container disableGutters={true} maxWidth={false}>
                <Grid container>
                    { stockData.map(data => <StockCard data={data} key={data.symbol}/>) }
                </Grid>
                <Box height='30px'/>
            </Container>
        </Container>
    )
}

export default StockTab

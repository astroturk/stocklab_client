import React from 'react'
import { Card, CardContent, makeStyles, Box, Typography, Grid, IconButton } from '@material-ui/core'
import { ArrowUpward, ArrowDownward, Clear } from '@material-ui/icons'
import Chart from './Chart';

import { useData } from '../context/DataContext'

const useStyles = makeStyles({
    root: {
        minWidth: '420px',
        maxWidth: '420px',
    },
});
  

function StockCard({ data }) {
    const { removeStockSymbol } = useData()
    console.log(data)
    const close = parseFloat(data.close)
    const prevClose = parseFloat(data.previousClose)
    const inc = (close - prevClose)
    const incPer = (inc/prevClose)*100

    let cl = ''
    if (inc > 0) cl = '#33eb91'
    else cl = '#ff726f'

    function handleRemoveButton(){
        removeStockSymbol(data.symbol)
    }

    const classes = useStyles() 
    return (
        <Box paddingTop='20px' paddingLeft='20px'>
        <Card className={classes.root}>
            <CardContent>
                <Box display='flex' flexDirection='column' alignItems='flex-start' paddingBottom='20px'>
                    <Typography>{data.name}</Typography>
                    <Grid container direction='row' justify='space-between'>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='h4' style={{fontSize: '34px', color: cl }}>{'$' + parseFloat(data.close).toFixed(2)}</Typography>
                            <Box display='flex' flexDirection='row' alignItems='flex-start'>
                                { inc > 0 ? <ArrowUpward fontSize='small' style={{color: cl}}/> : <ArrowDownward fontSize='small' style={{color: cl}}/>}
                                <Typography variant='body2' style={{fontSize: '16px', color: cl}}>{incPer.toFixed(2) + ' %'}</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' alignItems='flex-end'>
                            <Typography variant='h6'>{data.exchange}</Typography>
                            <Typography variant='subtitle1'>{data.symbol}</Typography>
                        </Box>
                    </Grid>
                </Box>
                <Chart data={data.history}/>
                <Grid container direction='row' justify='space-between' >
                    <Box display='flex' flexDirection='column' alignItems='flex-start'>
                        <Box display='flex' flexDirection='row'>
                            <Typography>Open:</Typography>
                            <Box width='10px'/>
                            <Typography variant='body1'>{'$' + parseFloat(data.open).toFixed(2)}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row'>
                            <Typography>High:</Typography>
                            <Box width='16px'/>
                            <Typography variant='body1'>{'$' + parseFloat(data.high).toFixed(2)}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row'>
                            <Typography>Low:</Typography>
                            <Box width='22px'/>
                            <Typography variant='body1'>{'$' + parseFloat(data.low).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' justifyContent='flex-end'>
                        <IconButton onClick={ handleRemoveButton }>
                            <Clear/>
                        </IconButton>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
        </Box>
    )
}

export default StockCard

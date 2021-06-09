import React from 'react'
import shortNumber from 'short-number'
import { Box, Typography } from '@material-ui/core'
import { ResponsiveContainer, AreaChart, Area, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts'
import { parseISO, format } from 'date-fns'

function Chart({data}) {
    let rdata = data.slice().reverse()
    for (let i = 0; i < rdata.length; i++){
        const val = rdata[i].close
        rdata[i].close = parseFloat(val)
    }
    return (
        <ResponsiveContainer height={150}>
            <AreaChart data={rdata} margin={{ top: 10, left: 0, right:0, bottom:10 }}>
                <defs>
                    <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#03dac6' stopOpacity={0.7}></stop>
                        <stop offset='75%' stopColor='#03dac6' stopOpacity={0.2}></stop>
                    </linearGradient>
                </defs>
                <YAxis width={35} axisLine={false} dataKey='close' stroke='white'
                    tickLine={false} tickFormatter={(number) => `$${shortNumber(Math.round(number))}`}
                    fontFamily='Montserrat' fontSize='10px' />
                <XAxis dataKey='datetime' stroke='white' 
                    tickLine={false} tickFormatter={(dateinfo) => {
                        const date = parseISO(dateinfo)
                        return format(date, ' MMM d')
                    }}
                    fontFamily='Montserrat' fontSize='10px'/>
                <Area dataKey='close' stroke='#03dac6' fill='url(#color)'/>
                <Tooltip content={<CustomTooltip/>}/>
                <CartesianGrid opacity={0.1} vertical={false}/>
            </AreaChart>
        </ResponsiveContainer>
    )
}

function CustomTooltip({ active, payload, label}) {
    if (active) {
        const data = payload[0].payload
        const date = format(parseISO(data.datetime), ' MMM d')
        return (
        <Box display='flex' flexDirection='column' bgcolor='primary.main' borderRadius='2px' paddingLeft='10px' paddingRight='10px'>
            <Typography variant='body2' color='secondary'>
                {'$'+parseFloat(data.close).toFixed(1)}
            </Typography>
            <Typography variant='caption' color='secondary'>
                {date}
            </Typography>
        </Box>
        )
    }
    return null
}

export default Chart

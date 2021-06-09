import React from 'react'
import { Typography, Card, CardActionArea, CardMedia, CardContent, makeStyles, Box, Divider } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      minWidth: '300px',
      maxWidth: '300px',
      minHeight: '370px'
    },
});
  

function NewsCard({ data }) {
    //console.log(data)
    function handleClick() {
        window.open(data.url)
    }

    const classes = useStyles();
    return (
        <Box paddingTop='20px' paddingLeft='20px'>
        <Card className={classes.root}>
            <CardActionArea onClick={ handleClick }>
                <CardMedia
                    component='img'
                    alt='article image'
                    height='140'
                    image={data.urlToImage}
                    title='news article'/>
            </CardActionArea>
            <CardContent>
                <Box height='60px' paddingBottom='10px'>
                    <Typography variant='subtitle2' align='left'>
                    { data.title.substr(0, 80) }
                    </Typography>
                </Box>
                <Divider/>
                <Box paddingTop='10px' height='100px'>
                    <Typography variant='body2' align='left'>
                    { data.description.substr(0, 160) }
                    </Typography>
                </Box>
            </CardContent>
        </Card>
        </Box>
    )
}

export default NewsCard

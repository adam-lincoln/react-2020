import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    width: 100,
    backgroundSize: 'contain',
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CardStyle2Summary = (props) => {

  const classes = useStyles();

  return (
    <Box my={1}>
      <Card className={classes.root}>
        {/* <CardMedia
          className={classes.avatar}
          title={props.name}
          image={props.image_name[0]}
        /> */}
        <div style={{
          display: 'flex',
          flexFlow: 'column',
          padding: '4px',
          placeContent: 'center',
        }}>
          {props.image_name.map((image_name, index) => {
            return (
              <img
                key={index}
                width="40px"
                height="40px"
                src={image_name}
                style={{
                  objectFit: 'contain',
                }}
                />
            );
          })}
        </div>
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6">
              {props.name}
            </Typography>
            <Typography variant="body2">
              Total1: {props.total1} | Total2: {props.total2}
            </Typography>
            <div>
              {/* {Object.keys(props.stats).map(key => {
                const stat = props.stats[key];
                return (
                  <div key={stat.code}>
                    <span><em>{stat.name}: {stat.val}</em></span>
                    <LinearProgressWithLabel variant="determinate" value={stat.pct} />
                  </div>
                )
              })} */}
              {Object.keys(props.stats).map(key => {
                const stat = props.stats[key];
                return (
                  <LinearProgressWithLabel
                    key={stat.code}
                    name={stat.name}
                    val={stat.val}
                    min={stat.min}
                    max={stat.max}
                    pct={stat.pct}
                    />
                )
              })}
            </div>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
}

export default CardStyle2Summary;

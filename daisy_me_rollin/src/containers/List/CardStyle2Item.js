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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 100,
    backgroundSize: 'contain',
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CardStyle2Item = (props) => {

  const classes = useStyles();

  return (
    <Box my={1}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.avatar}
          title={props.name}
          image={props.image_name}
        />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6">
              {props.name}
            </Typography>
            <Typography variant="body2">
              Total1: {props.total1} | Total2: {props.total2}
            </Typography>
            <div>
              {Object.keys(props.stats).map(key => {
                const stat = props.stats[key];
                // console.log(stat);
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

export default CardStyle2Item;

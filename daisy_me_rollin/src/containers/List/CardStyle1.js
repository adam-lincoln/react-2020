import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

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

const CardStyle1 = (props) => {

  const classes = useStyles();

  return (
    <Box my={1}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.avatar}
          title={props.name}
          image={props.type === 'summary' ? props.image_name[0] : props.image_name}
        />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6">
              {props.name}
            </Typography>
            <div>
              {Object.keys(props.stats).map(key => {
                const stat = props.stats[key];
                return (
                  <div key={stat.code}>
                    <span>{stat.name}: {stat.val}</span>
                    <LinearProgress variant="determinate" value={stat.pct} />
                    {/* <LinearProgressWithLabel variant="determinate" value={normaliseValue(stat.value, stat.min, stat.max)} /> */}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
}

export default CardStyle1;

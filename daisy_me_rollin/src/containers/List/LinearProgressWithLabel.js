import React from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const LinearProgressWithLabel = (props) => {

  return (

    // <Box display="flex" alignItems="center">
    //   <Box width="100%" mr={1}>
    //     <LinearProgress variant="determinate" value={props.pct}  />
    //   </Box>
    //   <Box minWidth={35}>
    //     <Typography variant="body2" color="textSecondary">{`${Math.round(props.value, )}%`}</Typography>
    //   </Box>
    // </Box>

    <div style={{
      display: 'flex',
      flexFlow: 'column',
    }}>
      <span><em>{props.name}</em></span>
      <div style={{
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
      }}>
        <LinearProgress
          style={{
            flexGrow: '1',
          }}
          variant="determinate"
          value={props.pct}
          />
        <span
          style={{
            minWidth: '3ch',
            textAlign: 'right',
          }}
        >
          {props.val}
        </span>
        {/* <span>{JSON.stringify(props)}</span> */}
      </div>
    </div>

  );
}

export default LinearProgressWithLabel;

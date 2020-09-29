import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
}));

const Filter = (props) => {

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      {/* https://material-ui.com/api/autocomplete/ */}
      <Autocomplete
        multiple
        options={props.items}
        limitTags={1}
        disableCloseOnSelect
        clearOnBlur
        clearOnEscape
        freeSolo
        fullWidth
        forcePopupIcon
        filterSelectedOptions
        getOptionLabel={(option) => option && option.name ? option.name : option}
        renderInput={(params) => <TextField variant="standard" label={props.title} {...params} />}
        renderOption={(option, { selected }) =>
          <React.Fragment>
            <img
              style={{ objectFit: 'contain', }}
              width='40px'
              height='40px'
              src={option.type === 'summary' ? option.image_name[0] : option.image_name}
              alt={option.type === 'summary' ? option.image_name[0] : option.image_name}
              />
            <Typography style={{ marginLeft: '8px', }}>
              {option.name}
            </Typography>
          </React.Fragment>
        }
        onChange={(event, value, reason) => props.changed(value)}
      />
    </FormControl>
  );
}

export default Filter;

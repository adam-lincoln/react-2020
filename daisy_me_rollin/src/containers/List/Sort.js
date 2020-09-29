import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Sort = (props) => {

  const classes = useStyles();

  const menuItems = props.items.map(item =>
    <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Sort</InputLabel>
      <Select value={props.selectedItem} onChange={(event) => props.changed(event.target.value)}>
        {menuItems}
      </Select>
    </FormControl>
  );
}

export default Sort;

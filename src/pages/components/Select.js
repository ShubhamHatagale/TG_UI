import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SelectBox from '../../components/Select'

export default (props) => {

  const options = ['Undefined', 'Current Process Improvement', 'Innovation'];
  const onChangeTagSelect = (event, value) => {
    props.onChangeTag(value, props.keyid)
  };
  const getSelectedItem = () => {
    const item = options.find((opt) => {
      if (opt.value == props.keyValue)
        return opt;
    })
    return item || {};
  }
  return (
    <div>
      <Autocomplete
        id="controllable-states-demo"
        defaultValue={props.keyValue} // put your default value here
        options={options}
        style={{ width: 300 }}
        // renderInput={(params) => <TextField {...params}  variant="outlined" />}
        onChange={(event, value) => { onChangeTagSelect(event, value) }} // prints the selected value
        renderInput={params => (
          <TextField {...params} variant="outlined" />
        )}
      />
    </div>
  )
}
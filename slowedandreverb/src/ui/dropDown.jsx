import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function SelectBitrate(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bitrate: 128,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(event.target.bitrate);
    console.log(event.target);
    setState({
      ...state,
      [name]: event.target.value,
    });
    props.onChange(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="bitrate">bitrate</InputLabel>
      <Select
        native
        value={state.bitrate}
        onChange={handleChange}
        inputProps={{
          name: "bitrate",
          id: "bitrate",
        }}
      >
        <option value={128}>128Kbps</option>
        <option value={192}>192Kbps</option>
        <option value={256}>256Kbps</option>
        <option value={320}>320Kbps</option>
      </Select>
    </FormControl>
  );
}

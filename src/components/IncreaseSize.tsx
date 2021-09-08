import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
    color:"white",
  },
});

export default function InputSlider(props:any) {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | string | Array<number | string>>(10);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
    props.resetSize(value)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value <= 1) {
      setValue(1);
    } else if (value > 100) {
      setValue(100);
    }
  };



  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 1}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            style = {{color:"white"}}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 1,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            disabled
          />
        </Grid>
      </Grid>
    </div>
  );
}

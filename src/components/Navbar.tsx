import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Increase from './IncreaseSize'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function ButtonAppBar(props:any) {
  const classes = useStyles();
  const buttonStyle = {
    color:"white"
  } 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button style = {buttonStyle} onClick = {props.generate}>Generate New Array</Button>
          <div className={classes.menuButton}>
            <Increase resetSize = {props.size}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

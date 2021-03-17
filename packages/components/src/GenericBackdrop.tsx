import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#5e81f4",
      background: "rgb(255 255 255 / 90%)",
    },
  })
);

type PropTypes = {
  open: boolean;
  onClick?: () => void;
};

const GenericBackdrop = (props: PropTypes) => {
  const { open, onClick } = props;
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GenericBackdrop;

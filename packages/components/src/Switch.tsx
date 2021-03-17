import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Field } from "formik";
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles({
  root: {
    marginLeft: 0,
    marginRight: 0,
  },
});

const SwitchStyled = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 22,
      padding: 0,
      display: "flex",
      margin: "auto",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(18px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: "#1b51e5",
          borderColor: "#1b51e5",
        },
      },
    },
    thumb: {
      width: 18,
      height: 18,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 40,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

type Props = {
  label?: string;
  name: string;
  onChange: (e: any) => void;
  checked?: boolean;
};

const SwitchWithOutLabel = (props: Props) => {
  const { label, onChange, name, checked } = props;
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Field
          name={name}
          component={SwitchStyled}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
      className={classes.root}
    />
  );
};

export default SwitchWithOutLabel;

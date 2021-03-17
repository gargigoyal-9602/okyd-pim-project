import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

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
  name: string;
  onChange: (e: any) => void;
  checked?: boolean;
};

const SwitchWithOutForm = (props: Props) => {
  const { onChange, name, checked } = props;

  return <SwitchStyled onChange={onChange} name={name} checked={checked} />;
};

export default SwitchWithOutForm;

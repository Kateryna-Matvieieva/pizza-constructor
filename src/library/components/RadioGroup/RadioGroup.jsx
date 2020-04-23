import React from "react";
import { Trans } from "react-i18next";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export default function CustomRadioGroup({ radioArray, dispatch, type, text }) {
  const handleChange = (e) => {
    e.stopPropagation();
    const payload = radioArray[+e.target.value].value;
    dispatch({ type, payload });
  };

  const FormControlLabelGroup = radioArray.map(({ label }, i) => (
    <FormControlLabel
      key={label + i}
      value={i.toString()}
      control={<Radio />}
      label={label}
    />
  ));

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Trans>{text}</Trans>
      </FormLabel>
      <RadioGroup
        defaultValue="1"
        aria-label={text}
        text={text}
        onChange={handleChange}
      >
        {FormControlLabelGroup}
      </RadioGroup>
    </FormControl>
  );
}

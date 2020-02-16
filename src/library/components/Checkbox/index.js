import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControlLabel,
  Checkbox as MaterialCheckbox,
} from "@material-ui/core";
import InputNumeric from "../InputNumeric";
import { CounterWrapper, GreyText } from "./styles";

export default function Checkbox({
  checkboxCb,
  inputNumberCb,
  value,
  label,
  inputNumericMax,
  orderGroupArray,
  setDefaultExpanded,
}) {
  const { t } = useTranslation();
  const dataFromOrder = orderGroupArray.find(
    ({ ingridient }) => ingridient === value.ingridient
  );
  const [checked, setChecked] = useState(!!dataFromOrder);
  value.portion = dataFromOrder?.portion || 1;
  const [inputNumber, setInputNumber] = useState(value.portion);
  const max = inputNumericMax + inputNumber;

  if (checked) setDefaultExpanded(true);

  return (
    <CounterWrapper>
      <FormControlLabel
        key={value.ingridient}
        control={
          <MaterialCheckbox
            onChange={(e) => {
              setChecked(!checked);
              checkboxCb(e, value);
            }}
            name={label}
            color="primary"
            disabled={!checked && max === inputNumber}
            checked={checked}
          />
        }
        label={label}
      />
      <GreyText>{`${value.weight * value.portion}${t("g")}/${
            value.price * value.portion
          }${t("currency")}`}</GreyText>
      {checked && (
        <>
          <InputNumeric
            min={1}
            max={max}
            value={inputNumber}
            onChange={(num) => {
              setInputNumber(num);
              inputNumberCb(num, value);
            }}
          />
        </>
      )}
    </CounterWrapper>
  );
}
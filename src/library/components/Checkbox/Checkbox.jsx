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
  const dataFromOrder = useMemo(() => orderGroupArray.find(({ name }) => name === value.name), [orderGroupArray, value.name]);
  const [checked, setChecked] = useState(!!dataFromOrder);
  value.portion = useMemo(() => dataFromOrder?.portion || 1, [dataFromOrder?.portion]);
  const [inputNumber, setInputNumber] = useState(value.portion);
  const max = useMemo(() => inputNumericMax + inputNumber, [inputNumericMax, inputNumber]);
  console.log(value.name, {inputNumericMax,inputNumber}, max)
  const disabled = useMemo(() => !checked && max === inputNumber, [checked, max, inputNumber]);

  if (checked) setDefaultExpanded(true);

  return (
    <CounterWrapper>
      <FormControlLabel
        key={value.name}
        control={
          <MaterialCheckbox
            onChange={(e) => {
              setChecked(!checked);
              checkboxCb(e, value);
            }}
            name={label}
            color="primary"
            disabled={disabled}
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

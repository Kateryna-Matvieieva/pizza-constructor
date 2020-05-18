import React, { useState, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel } from "@material-ui/core";
import Collapsible from "react-collapsible";
import Checkbox from "../Checkbox";
import OrderContext from "../../../engine/OrderContext";
import { ORDER_ACTIONS } from "../../../engine/OrderReducer";
import { CollapsibleWrapper } from "./styles";

export default function CheckboxGroup({
  ingridientsArray,
  text,
  category,
  inputNumericMax,
  orderGroupArray,
}) {
  const { t } = useTranslation();
  const [defaultExpanded, setDefaultExpanded] = useState(false);
  const [,dispatch] = useContext(OrderContext);

  const handleCheckboxChange = (e, payload) => {
    e.stopPropagation();
    payload = { [category]: payload };
    if (e.target.checked) {
      dispatch({ type: ORDER_ACTIONS.ADD_PIZZA_INGRIDIENT, payload });
      return;
    }
    dispatch({ type: ORDER_ACTIONS.DELETE_PIZZA_INGRIDIENT, payload });
  };
  const handleNumericChange = (portion, payload) => {
    payload = { portion, item: { [category]: payload } };
    dispatch({ type: ORDER_ACTIONS.UPDATE_PIZZA_INGRIDIENT, payload });
  };

  const FormControlLabelGroup = useMemo(() => ingridientsArray.map(({ value, label }) => {
    return (
      <Checkbox
        checkboxCb={handleCheckboxChange}
        inputNumberCb={handleNumericChange}
        value={value}
        label={label}
        inputNumericMax={inputNumericMax}
        orderGroupArray={orderGroupArray}
        setDefaultExpanded={setDefaultExpanded}
      />
    );
  }), [ingridientsArray]);

  return (
    <CollapsibleWrapper>
      <Collapsible trigger={t(text)} open={defaultExpanded}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          {FormControlLabelGroup}
        </FormControl>
      </Collapsible>
    </CollapsibleWrapper>
  );
}

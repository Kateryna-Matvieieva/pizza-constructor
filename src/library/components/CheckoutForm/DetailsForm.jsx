import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import OrderContext from "../../../engine/OrderContext";
import { ORDER_ACTIONS } from "../../../engine/OrderReducer";

export default function DetailsForm() {
  const [order, dispatch] = useContext(OrderContext);
  const { user } = order;
  const { t } = useTranslation();

  const updateCheckout = (e, key) => {
    const payload = { ...user, [key]: e.target.value };
    dispatch({ type: ORDER_ACTIONS.UPDATE_CHECKOUT, payload });
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        <Trans>shippingAddress</Trans>
      </Typography>
        <form className='checkout-form'  id='checkout-form' autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            form="checkout-form"
            defaultValue={user.firstName}
            onChange={(e) => updateCheckout(e, "firstName")}
            label={t("firstName")}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="lastName"
            form="checkout-form"
            defaultValue={user.lastName}
            onChange={(e) => updateCheckout(e, "lastName")}
            label={t("lastName")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="address"
            form="checkout-form"
            defaultValue={user.address}
            onChange={(e) => updateCheckout(e, "address")}
            label={t("address")}
            fullWidth
          />
        </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  required
                  name="telephone"
                  form="checkout-form"
                  defaultValue={user.telephone}
                  onChange={(e) => updateCheckout(e, "telephone")}
                  label={t("telephone")}
                  fullWidth
              />
          </Grid>
        <Grid item xs={12}>
          <TextField
            name="comment"
            form="checkout-form"
            defaultValue={user.comment}
            onChange={(e) => updateCheckout(e, "comment")}
            label={t("comment")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="city"
            form="checkout-form"
            defaultValue={user.city}
            onChange={(e) => updateCheckout(e, "city")}
            label={t("city")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="region"
            defaultValue={user.region}
            onChange={(e) => updateCheckout(e, "region")}
            form="checkout-form"
            label={t("region")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="h6" gutterBottom>
                <Trans>choosePaymentMethod</Trans>
              </Typography>
            </FormLabel>
            <RadioGroup
              value={user.payment}
              onChange={(e) => updateCheckout(e, "payment")}
            >
              <FormControlLabel
                value={"cash"}
                control={<Radio />}
                label={t("cashToCarrier")}
              />
              <FormControlLabel
                value={"card"}
                control={<Radio />}
                label={t("cardToCarrier")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
        </form>
    </>
  );
}

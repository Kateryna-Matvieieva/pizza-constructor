import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Typography,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useReviewStyles } from "./styles";
import OrderContext from "../../../engine/OrderContext";

const CatigoryTitle = ({ title, classes }) =>
  title && (
    <>
      <Divider />
      <Typography variant="subtitle2" className={classes.total}>
        <Trans>{title}</Trans>
      </Typography>
    </>
  );

const TotalInfo = ({ total, title, classes }) => (
  <ListItem className={classes.listItem}>
    <ListItemText primary={title} />
    <Typography variant="subtitle1" className={classes.total}>
      {total}
    </Typography>
  </ListItem>
);

export default function ReviewPizza() {
  const [order] = useContext(OrderContext);
  const classes = useReviewStyles();
  const { t } = useTranslation();

  const cb = ({ name, price, weight, portion=1 }) => (
    <ListItem className={classes.listItem} key={name}>
      <ListItemText
        primary={t(name)}
        secondary={`${portion * weight}${t("g")}`}
      />
      <Typography variant="body2">{`${portion * price}${t(
        "currency"
      )}`}</Typography>
    </ListItem>
  );

  const fillings = order.fillings.map(cb);
  const sauces = order.sauces.map(cb);
  const additional = order.additional.map(cb);
  const base = order.base.map(cb);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        <Trans>pizzaIngridients</Trans>
      </Typography>
      <List disablePadding>
        <CatigoryTitle classes={classes} title={"orderedBase"} />
        {base}
        <CatigoryTitle classes={classes} title={"orderedFillings"} />
        {fillings}
        <CatigoryTitle classes={classes} title={"orderedSauces"} />
        {sauces}
        <CatigoryTitle
          classes={classes}
          title={!!additional.length && "orderedAdditional"}
        />
        {additional}
        <Divider />
        <TotalInfo
          total={`${order.totalWeight}${t("g")}`}
          title={t("totalWeight")}
          classes={classes}
        />
        <TotalInfo
          total={`${order.totalCoast}${t("currency")}`}
          title={t("totalCoast")}
          classes={classes}
        />
      </List>
    </>
  );
}

import React, { useContext, useMemo } from 'react';
import { Chip } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import ConstructorContext from '../../engine/ConstructorContext';
import OrderContext from '../../engine/OrderContext';
import { ORDER_ACTIONS } from '../../engine/OrderReducer';
import Template from '../../library/components/Template';
import InfoBlock from '../../library/components/InfoBlock';
import RadioGroup from '../../library/components/RadioGroup';
import CheckboxGroupsSection from '../../library/components/CheckboxGroupsSection';
import { Button } from '@material-ui/core';
import { TotalText, GreyText, RadioGroupsSection } from './styles';

const getTotalAmount = (arr = []) => {
  return arr.map(({ portion }) => portion).reduce((sum, item) => sum + item, 0);
};

export default function Constructor(props) {
  const [{ pizzaData: { size, sizeCM, ingridientsAmount }, base }] = useContext(ConstructorContext);
  const [order, orderDispatch] = useContext(OrderContext);
  const { t } = useTranslation();

  // const { pizzaData, base } = constructor;

  // const { size, sizeCM, ingridientsAmount } = pizzaData;

  const sizeRadioChoices = useMemo(() => size.map((item) => ({
    label: `${t(item)} (${sizeCM[item]} ${t('cm')})`,
    value: item,
  })), [size]);

  const baseRadioChoices = useMemo(() => base.map(({ name, weight, price }) => {
    weight = weight[order.size];
    price = price[order.size];
    return {
      label: `${t(name)} (${weight}${t('g')}) ${price}${t('currency')}`,
      value: { name, weight, price },
    };
  }), [base, order.size]);

  const allFillingsChose =
  useMemo(() => getTotalAmount(order.fillings) === ingridientsAmount.fillings[order.size], [order.fillings, ingridientsAmount.fillings, order.size]);
  const allSaucesChose =
  useMemo(() => getTotalAmount(order.sauces) === ingridientsAmount.sauces, [order.fillings, ingridientsAmount.sauces, order.size]);

  const disableSubmit = useMemo(() => !(allFillingsChose && allSaucesChose), [allFillingsChose, allSaucesChose]);

  return (
    <Template title='constructorPage'>
      <InfoBlock>
        <h3>
          <Trans>constructorPageDesc</Trans>
        </h3>
      </InfoBlock>
      <RadioGroupsSection>
        <RadioGroup
          radioArray={sizeRadioChoices}
          dispatch={orderDispatch}
          type={ORDER_ACTIONS.UPDATE_PIZZA_SIZE}
          text='size'
        />
        <RadioGroup
          radioArray={baseRadioChoices}
          dispatch={orderDispatch}
          type={ORDER_ACTIONS.UPDATE_PIZZA_BASE}
          text='base'
        />
      </RadioGroupsSection>
      <CheckboxGroupsSection
        group='fillings'
        inputNumericMax={ingridientsAmount.fillings[order.size]}
        type = {ORDER_ACTIONS.REDUCE_FILLINGS}
      />
      <CheckboxGroupsSection
        group='sauces'
        inputNumericMax={ingridientsAmount.sauces}
      />
      <CheckboxGroupsSection
        group='additional'
        inputNumericMax={ingridientsAmount.additional}
      />
      <TotalText>
        <Trans>totalWeight</Trans>
        <Chip variant='outlined' color='primary' label={order.totalWeight + t('g')} />
      </TotalText>
      <TotalText>
        <Trans>totalCoast</Trans>
        <Chip  variant='outlined'color='primary' label={order.totalCoast + t('currency')} />
      </TotalText>
      <br />
      {disableSubmit ? (
        <>
          <GreyText>
            <Trans>chooseToSubmit</Trans>
          </GreyText>
          <Button variant='contained' color='primary' disabled href='/checkout'>
            <Trans>next</Trans>
          </Button>
        </>
      ) : (
        <Button variant='contained' color='primary' href='/checkout'>
          <Trans>next</Trans>
        </Button>
      )}
    </Template>
  );
}

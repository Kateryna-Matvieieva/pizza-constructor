import React, { useContext, useMemo } from 'react';
import { Chip } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import ConstructorContext from '../../../engine/ConstructorContext';
import OrderContext from '../../../engine/OrderContext';
import CheckboxGroup from '../CheckboxGroup';
import InfoBlock from '../../../library/components/InfoBlock';
import { SectionWrapper, GreyText } from './styles';

export default function CheckboxGroupsSection({ group, inputNumericMax, type }) {
  const [generalConstructor] = useContext(ConstructorContext);
  const [order, dispatch] = useContext(OrderContext);
  const { t } = useTranslation();

  const constructor = useMemo(() => generalConstructor[group], [generalConstructor, group]);
  const ingridientGroups = useMemo(() => Object.keys(constructor), [constructor]);
  const orderGroupArray = useMemo(() => order[group] || [], [order, group]);
  const amount = useMemo(() => orderGroupArray
    .map(({ portion }) => portion)
    .reduce((sum, item) => sum + item, 0), [orderGroupArray]);
  
  useMemo(() => {
    if (amount > inputNumericMax) dispatch({ type });
  }, [amount, inputNumericMax]);

  const getPizzaIngridientChoices = (item, catigory) => {
    return item.map(({ name, weight, price }) => ({
      label: `${t(name)}`,
      value: { name, weight, price, catigory },
    }));
  };

  console.log({inputNumericMax , amount})  

  const CheckboxGroups = useMemo(() => ingridientGroups.map((key) => {
    return (
      <CheckboxGroup
        key={key}
        ingridientsArray={getPizzaIngridientChoices(constructor[key], key)}
        text={key}
        category={group}
        inputNumericMax={inputNumericMax - amount}
        orderGroupArray={orderGroupArray}
      />
    );
  }), [ingridientGroups]);

  const chipColor = useMemo(() => (inputNumericMax - amount === 0 || group === 'additional') ? 'primary' : 'secondary', [amount, inputNumericMax]);
  return (
    <>
      <InfoBlock>
        <p>
          <Trans>{group}</Trans>
        </p>
      </InfoBlock>
      <GreyText>
        <Trans>chosenAmount</Trans>
        <Chip color={chipColor} size='small' label={inputNumericMax - amount}/>
      </GreyText>
      <GreyText>
        <Trans>amountCapability</Trans>
        <Chip color='primary' size='small' label={amount} />
      </GreyText>
      <SectionWrapper>{CheckboxGroups}</SectionWrapper>
      <Divider />
    </>
  );
}

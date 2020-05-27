import React, { useContext } from 'react';
import { Chip } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import ConstructorContext from '../../../engine/ConstructorContext';
import OrderContext from '../../../engine/OrderContext';
import CheckboxGroup from '../CheckboxGroup';
import InfoBlock from '../../../library/components/InfoBlock';
import { SectionWrapper, GreyText } from './styles';

export default function CheckboxGroupsSection({ group, inputNumericMax, inputNumericMin, type }) {
  const [generalConstructor] = useContext(ConstructorContext);
  const [order] = useContext(OrderContext);
  const { t } = useTranslation();

  const constructor = generalConstructor[group];
  const ingridientGroups = Object.keys(constructor);
  const orderGroupArray = order[group] || [];
  const amount = orderGroupArray
    .map(({ portion }) => portion)
    .reduce((sum, item) => sum + item, 0);

  const getPizzaIngridientChoices = (item, catigory) => {
    return item.map(({ name, weight, price }) => ({
      label: `${t(name)}`,
      value: { name, weight, price, catigory },
    }));
  };

  const CheckboxGroups = ingridientGroups.map((key) => {
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
  });
  console.log(inputNumericMin, inputNumericMax, amount)

  const chipColor = ((inputNumericMin || inputNumericMax) - amount <= 0 || group === 'additional') ? 'primary' : 'secondary';
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

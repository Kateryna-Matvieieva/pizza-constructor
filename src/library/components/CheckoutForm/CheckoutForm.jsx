import React, { useState, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DetailsForm from './DetailsForm';
import ReviewPizza from './ReviewPizza';
import OrderContext from '../../../engine/OrderContext';
import { formatOrder } from './helpers';
import { useCheckoutStyles } from './styles';

const steps = ['reviewYourOrder', 'details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReviewPizza />;
    case 1:
      return <DetailsForm />;
    default:
      throw new Error('Unknown step');
  }
}

const OrderSubmited = ({ orderNumber }) => (
  <>
    <Typography variant='h5' gutterBottom>
      <Trans>thankYouForOrder</Trans>
    </Typography>
    <Typography variant='subtitle1'>
      <Trans>yourOrderNumber</Trans>
      {orderNumber}
      <br />
      <Trans>confirmationDetails</Trans>
    </Typography>
  </>
);


export default function Checkout() {
  const [order] = useContext(OrderContext);
  const { t } = useTranslation();
  const classes = useCheckoutStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    const orderData = formatOrder(order);

    try {
      const response = await fetch(process.env.REACT_APP_API_POST_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log({data})

      if(!data?.orderNumber) throw new Error('Place order fails');
    
      setOrderNumber(data.orderNumber);
      setActiveStep(activeStep + 1);
      localStorage.clear();      
    } catch(e) {
      throw new Error('Error during placing order');
    }
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            <Trans>сheckout</Trans>
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Trans>{label}</Trans>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <OrderSubmited orderNumber={orderNumber} />
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 ? (
                    <Button onClick={handleBack} className={classes.button}>
                      <Trans>back</Trans>
                    </Button>
                  ) : (
                    <Button href='/constructor' className={classes.button}>
                      <Trans>backToConstr</Trans>
                    </Button>
                  )}
                  {activeStep === steps.length - 1
                      ? (<Button
                        variant='contained'
                        color='primary'
                        onClick={handlePlaceOrder}
                        className={classes.button}
                      >
                        <Trans>placeOrder</Trans>
                      </Button>)
                      : (<Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        className={classes.button}
                      >
                        <Trans>next</Trans>
                      </Button>)}
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}

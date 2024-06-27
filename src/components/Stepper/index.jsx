import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// Image paths
import FoodCreated from '/order.png';
import FoodCooking from '/food-cooking.svg';
import ReadyForDelivery from '/food-package.svg';
import FoodDelivery from '/food-delivery.webp';
import FoodDelivered from '/food-delivered.png';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 136deg, #25392B 0%, #4B9354 50%, #16C728 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 136deg, #25392B 0%, #4B9354 50%, #16C728 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 30,
  height: 30,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, #25392B 0%, #4B9354 50%, #16C728 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, #25392B 0%, #4B9354 50%, #16C728 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <img src={FoodCreated} alt="Created" style={{ width: 20, height: 20 }} />,
    2: <img src={FoodCooking} alt="Preparing" style={{ width: 20, height: 20 }} />,
    3: <img src={ReadyForDelivery} alt="Ready for delivery" style={{ width: 20, height: 20 }} />,
    4: <img src={FoodDelivery} alt="On the way" style={{ width: 20, height: 20 }} />,
    5: <img src={FoodDelivered} alt="Delivered" style={{ width: 20, height: 20 }} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Created', 'Preparing', 'Ready for delivery', 'On the way', 'Delivered'];

const CustomStep = styled(Step)({
  padding: 5, // Adjust padding as needed
});

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '0.9rem', 
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem', 
      fontWeight: 600,
    },
  },
}));

export default function Index({ orderStatus }) {
  return (
    <Stack sx={{ width: '100%' }}>
      <Stepper alternativeLabel activeStep={orderStatus()} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <CustomStep key={label}>
            <CustomStepLabel StepIconComponent={ColorlibStepIcon}>{label}</CustomStepLabel>
          </CustomStep>
        ))}
      </Stepper>
    </Stack>
  );
}
 
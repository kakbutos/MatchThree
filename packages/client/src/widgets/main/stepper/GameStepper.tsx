import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteGame } from '@/constants/router/router';
import s from './stepper.module.scss';

// TODO добавить инструкцию после создания игры

const steps = [
  {
    label: 'Настройка',
    description: `Для более комфортного прохождения настройте сложность и механику игры`,
  },
  {
    label: 'Инструкция',
    description:
      'В игре Cosmo вам нужно поменять местами 2 предмета, чтобы получить 3 подряд',
  },
  {
    label: 'Отзыв',
    description: `Поделитесь отзывом об игре в разделе "Форум"`,
  },
];

export const GameStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className={s.wr} sx={{ maxWidth: '70%', p: 5 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel className={s.label}>{step.label}</StepLabel>
            <StepContent>
              <Typography sx={{ fontSize: 18 }}>{step.description}</Typography>
              <Box sx={{ mb: 3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Закончить' : 'Продолжить'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}>
                    Назад
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 20 }}>
            Обучение пройдено - переходите к игре!
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Начать сначала
          </Button>
          <Button
            onClick={() => navigate(getRouteGame())}
            sx={{ mt: 1, mr: 1 }}>
            Играть
          </Button>
        </Paper>
      )}
    </Box>
  );
};

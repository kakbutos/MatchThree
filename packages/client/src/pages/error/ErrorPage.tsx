import { GlobalStyles, Typography, Button } from '@mui/material';
import { palette } from '../../theme/palette';
import Star from '../../assets/icons/star.svg?react';
import styles from './error-page.module.scss';

interface ErrorPageProps {
  text?: string;
  showNavigateBtn?: boolean;
}

const LAYERS = 5;
const STARS = 30;

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNum = (min: number, max: number): string => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const renderLayers = () => {
  const layers: JSX.Element[] = [];

  for (let i = LAYERS; i > 0; i--) {
    const stars = [];

    for (let j = STARS; j > 0; j--) {
      const starStyle = {
        left: `${randomInt(1, 100)}%`,
        top: `${randomInt(1, 100)}%`,
        transform: `scale(${randomNum(0, 1)})`,
        opacity: randomNum(0.6, 1),
      };

      stars.push(
        <span key={j} className={styles.star} style={starStyle}>
          <Star />
        </span>
      );
    }

    const layerClassName = `${styles.layer} ${styles[`layer${i}`]}`;
    const layer = (
      <div key={i} className={layerClassName}>
        {stars}
      </div>
    );

    layers.push(layer);
  }

  return layers;
};

export const ErrorPage = ({
  text,
  showNavigateBtn = false,
}: ErrorPageProps) => {
  return (
    <div className={styles.errorPage}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: 'var(--primary-color)' },
          button: { backgroundColor: palette.grey },
        }}
      />
      <div className={styles.content}>
        <Typography component="h1" className={styles.text} gutterBottom>
          {text ?? 'Произошла непредвиденная ошибка'}
        </Typography>
        {showNavigateBtn && (
          <Button
            size="large"
            fullWidth
            href="/"
            sx={{ backgroundColor: theme => theme.palette.text.secondary }}>
            На главную
          </Button>
        )}
      </div>
      <div className={styles.layerWrap}>{renderLayers()}</div>
    </div>
  );
};

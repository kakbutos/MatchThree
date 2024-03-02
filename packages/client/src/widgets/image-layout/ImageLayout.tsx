import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import styles from './image-layout.module.scss';
import { Button } from '@mui/material';

interface ImageLayoutProps {
  BackgroundImage: React.FC;
}

const EmptyBackgroundDiv = styled('div')(({ theme }) => ({
  width: '20%',
  height: '100%',
  float: 'right',
  backgroundColor: theme.palette.background.default,
}));

export const ImageLayout: React.FC<
  React.PropsWithChildren<ImageLayoutProps>
> = ({ children, BackgroundImage }) => (
  <Grid container component="main" sx={{ height: '100vh' }}>
    <Grid item xs={false} sm={4} className={styles.backgroundContainer}>
      <div className={styles.imageContainer}>
        <BackgroundImage />
        <Grid>
          <Button href="/" color="secondary" variant="outlined">
            Выйти на главную
          </Button>
        </Grid>
      </div>
      <EmptyBackgroundDiv />
    </Grid>
    <Grid item xs={12} sm={8} className={styles.formContainer}>
      {children}
    </Grid>
  </Grid>
);

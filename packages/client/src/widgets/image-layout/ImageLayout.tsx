import * as React from 'react';
import Grid from '@mui/material/Grid';
import styles from './image-layout.module.scss';

interface ImageLayoutProps {
  BackgroundImage: React.FC;
}

export const ImageLayout: React.FC<
  React.PropsWithChildren<ImageLayoutProps>
> = ({ children, BackgroundImage }) => (
  <Grid container component="main" sx={{ height: '100vh' }}>
    <Grid item xs={false} sm={4} className={styles.backgroundContainer}>
      <div className={styles.imageContainer}>
        <BackgroundImage />
      </div>
      <div className={styles.emptyBackground} />
    </Grid>
    <Grid item xs={12} sm={8} className={styles.formContainer}>
      {children}
    </Grid>
  </Grid>
);

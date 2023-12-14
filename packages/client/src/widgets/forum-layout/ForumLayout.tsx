import { Box } from '@mui/material';
import ForumTitleIcon from '@/assets/images/forum-title.svg?react';
import styles from './forum-layout.module.scss';

export const ForumLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Box className={styles.background}>
    <Box className={styles.content}>
      <Box marginTop={3} marginBottom={3}>
        <ForumTitleIcon />
      </Box>
      {children}
    </Box>
  </Box>
);

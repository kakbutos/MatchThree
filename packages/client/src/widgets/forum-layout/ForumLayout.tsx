import { Box } from '@mui/material';
import ForumTitleIcon from '@/assets/images/forum-title.svg?react';
import { styled } from '@mui/system';
import styles from './forum-layout.module.scss';
import { ThemeButton } from '../theme-button/ThemeButton';

const BackgroundDiv = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  color: '#ffffff',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
}));

export const ForumLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <BackgroundDiv>
    <ThemeButton isAbsolutePosition />
    <Box className={styles.content}>
      <Box marginTop={3} marginBottom={3}>
        <ForumTitleIcon />
      </Box>
      {children}
    </Box>
  </BackgroundDiv>
);

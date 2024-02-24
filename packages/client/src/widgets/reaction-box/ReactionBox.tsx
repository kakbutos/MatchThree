import { Box, Typography } from '@mui/material';
import styles from './reaction-box.module.scss';
import { ReactionData } from '@/types/forum/api';

interface ReactionBoxProps {
  reactions: ReactionData[];
  isUserInReaction: (index: number) => boolean;
  handleReactionClick: (index: number) => void;
}

export const ReactionBox: React.FC<ReactionBoxProps> = ({
  reactions,
  isUserInReaction,
  handleReactionClick,
}) => {
  return (
    <>
      {reactions.map((reaction, index) => (
        <Box
          className={`${styles.reaction} ${
            isUserInReaction(index) ? styles.reactionActive : ''
          }`}
          onClick={() => handleReactionClick(index)}
          key={index}>
          <Typography component="span">{reaction.reaction}</Typography>
          <Typography component="span">{reaction.users.length}</Typography>
        </Box>
      ))}
    </>
  );
};

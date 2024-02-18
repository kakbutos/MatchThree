import { Avatar, Box, Typography, IconButton, Popover } from '@mui/material';
import styles from './comment.module.scss';
import { FC, useState } from 'react';
import moment from 'moment';
import { ReactionData, ReplyResponse } from '@/types/forum/api';
import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';

interface ReplyProps {
  reply: ReplyResponse;
}

export const Reply: FC<ReplyProps> = ({ reply }) => {
  const [localReply, setLocalReply] = useState<ReplyResponse>(reply);
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const toggleEmojiPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(showPicker ? null : event.currentTarget);
    setShowPicker(value => !value);
    if (isHovered) {
      setIsHovered(prev => !prev);
    }
  };
  const currentUser = useAppSelector(UserStore.selectors.selectCurrentUser);

  const handleEmojiSelect = ({ native }: { native: string }) => {
    addNewReaction(native);
    setAnchorEl(null);
    setShowPicker(value => !value);
    setIsHovered(false);
  };

  const updateReactions = (newReactions: Array<ReactionData>): void => {
    setLocalReply(prevComment => ({
      ...prevComment,
      reactions: newReactions,
    }));
  };

  const addNewReaction = (reaction: string): void => {
    let indexIfAlreadyContains = null;
    localReply?.reactions?.map((item, index) => {
      if (item.reaction !== reaction) return;

      indexIfAlreadyContains = index;
    });

    if (indexIfAlreadyContains !== null) {
      if (checkCurrentUserExistInReactions(indexIfAlreadyContains)) {
        deleteReaction(indexIfAlreadyContains);
        return;
      }

      const newReactions = [...localReply.reactions];
      newReactions[indexIfAlreadyContains] = {
        ...newReactions[indexIfAlreadyContains],
        users: newReactions[indexIfAlreadyContains].users.concat(
          currentUser.id
        ),
      };
      updateReactions(newReactions);
      return;
    }

    updateReactions(
      localReply.reactions.concat({
        reaction: reaction,
        users: [currentUser.id],
      })
    );
  };

  const handleReactionClick = (index: number): void => {
    const indexIfAlreadyContainsInUser = localReply.reactions[
      index
    ].users.indexOf(currentUser.id);

    if (indexIfAlreadyContainsInUser === -1) {
      addNewReaction(localReply.reactions[index].reaction);
      return;
    }

    deleteReaction(index);
  };

  const deleteReaction = (index: number): void => {
    const indexIfAlreadyContainsInUser = localReply.reactions[
      index
    ].users.indexOf(currentUser.id);

    const newReactions = [...localReply.reactions];
    const newUsers = [...newReactions[index].users];
    newUsers.splice(indexIfAlreadyContainsInUser, 1);
    newReactions[index] = {
      ...newReactions[index],
      users: newUsers,
    };

    if (!newReactions[index].users.length) {
      newReactions.splice(index, 1);
    }

    updateReactions(newReactions);
  };

  const checkCurrentUserExistInReactions = (index: number): boolean => {
    return localReply.reactions[index].users.indexOf(currentUser?.id) !== -1;
  };

  return (
    <Box
      className={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Box className={styles.replyContainer}>
        <Box display="flex" gap="6px">
          <Avatar
            alt="avatar"
            src={`https://ui-avatars.com/api/?name=${localReply.userId}`}
          />
          <Box className={styles.commentInfo}>
            <Box display={'flex'}>
              <Typography component="span" padding={'0 0 10px 0'}>
                Пользователь {localReply.userId}
              </Typography>
              {isHovered && (
                <div className={styles.smileyReplyIcon}>
                  <IconButton
                    aria-label="toggle emoji popover"
                    onClick={toggleEmojiPicker}
                    onMouseDown={toggleEmojiPicker}>
                    <SentimentSatisfiedOutlined style={{ color: 'white' }} />
                  </IconButton>
                  <Popover
                    open={showPicker}
                    onClose={toggleEmojiPicker}
                    anchorEl={anchorEl}>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </Popover>
                </div>
              )}
            </Box>
            <Typography component="span">{localReply.content}</Typography>
          </Box>
        </Box>
        <Box className={styles.commentInfo} alignItems="end">
          <Typography component="span">{`${moment(localReply.createdAt).format(
            'MMM Do YY, h:mm a'
          )}`}</Typography>
        </Box>
      </Box>
      <Box className={styles.reactionBox}>
        {localReply.reactions.length
          ? localReply.reactions.map((reaction, index) => (
              <Box
                className={`${styles.reaction} ${
                  checkCurrentUserExistInReactions(index)
                    ? styles.reactionActive
                    : ''
                }`}
                onClick={() => handleReactionClick(index)}
                key={index}>
                <Typography component="span">{reaction.reaction}</Typography>
                <Typography component="span">
                  {reaction.users.length}
                </Typography>
              </Box>
            ))
          : ''}
      </Box>
    </Box>
  );
};

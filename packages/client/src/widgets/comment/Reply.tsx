import { Avatar, Box, Typography, IconButton, Popover } from '@mui/material';
import styles from './comment.module.scss';
import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { ReactionData, ReplyResponse } from '@/types/forum/api';
import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';
import EmojiService from '../reaction-box/EmojiService';
import { ReactionBox } from '../reaction-box/ReactionBox';

interface ReplyProps {
  reply: ReplyResponse;
}

export const Reply: FC<ReplyProps> = ({ reply }) => {
  const [localReply, setLocalReply] = useState<ReplyResponse>(reply);
  const [localReactions, setLocalReactions] = useState<ReactionData[]>(
    reply.reactions
  );
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
  const [emojiService, setEmojiService] = useState<EmojiService | null>(null);

  const handleEmojiSelect = ({ native }: { native: string }) => {
    emojiService!.addNewReaction(native);
    setAnchorEl(null);
    setShowPicker(value => !value);
    setIsHovered(false);
  };

  useEffect(() => {
    if (currentUser) {
      const newEmojiService = new EmojiService({
        currentUserId: currentUser.id,
        reactions: localReactions,
        setReactions: setLocalReactions,
      });

      setEmojiService(newEmojiService);
      updateReactions();
    }
  }, [currentUser, localReactions]);

  const updateReactions = () => {
    setLocalReply(prevComment => ({
      ...prevComment,
      reactions: localReactions,
    }));
  };

  const handleReactionClick = (index: number) => {
    emojiService!.handleReactionClick(index);
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
        <ReactionBox
          reactions={localReply.reactions}
          isUserInReaction={index =>
            emojiService!.getIndexCurrentUserInReactions(index) !== -1
          }
          handleReactionClick={handleReactionClick}
        />
      </Box>
    </Box>
  );
};

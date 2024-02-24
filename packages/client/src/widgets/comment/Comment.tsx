import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Popover,
} from '@mui/material';
import ReplyIcon from '@/assets/icons/reply.svg?react';
import styles from './comment.module.scss';
import { ReplyCommentForm } from './ReplyCommentForm';
import {
  CommentResponse,
  ReactionData,
  ReplyResponse,
} from '@/types/forum/api';
import { FC, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Reply } from './Reply';
import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';
import EmojiService, {
  EmojiServiceCommand,
} from '../reaction-box/EmojiService';
import { ReactionBox } from '../reaction-box/ReactionBox';

const sortByDate = (a: ReplyResponse, b: ReplyResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

interface CommentProps {
  comment: CommentResponse;
  openedId: string | null;
  onOpenReply: (id: string) => void;
  fetchTopic: () => void;
}

export const Comment: FC<CommentProps> = ({
  comment,
  openedId,
  onOpenReply,
  fetchTopic,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localComment, setLocalComment] = useState<CommentResponse>(comment);
  const [localReactions, setLocalReactions] = useState<ReactionData[]>(
    comment.reactions
  );

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
    setLocalComment(prevComment => ({
      ...prevComment,
      reactions: localReactions,
    }));
  };

  const handleEmojiSelect = ({ native }: { native: string }) => {
    emojiService!.addNewReaction(native);
    setAnchorEl(null);
    setShowPicker(value => !value);
    setIsHovered(false);
  };

  const handleReactionClick = (index: number) => {
    emojiService!.handleReactionClick(index);
  };

  const sortedReplies = useMemo(
    () => comment.replies?.sort(sortByDate),
    [comment]
  );

  return (
    <>
      <Box
        className={styles.wrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Box className={styles.commentContainer}>
          <Box display="flex" gap="16px">
            <Avatar
              alt="avatar"
              src={`https://ui-avatars.com/api/?name=${localComment.userId}`}
            />
            <Box className={styles.commentInfo}>
              <Box display={'flex'}>
                <Typography component="span">
                  Пользователь {localComment.userId}
                </Typography>
                {isHovered && (
                  <div className={styles.smileyIcon}>
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
              <Typography component="span">{localComment.content}</Typography>
            </Box>
          </Box>
          <Box className={styles.commentInfo} alignItems="end">
            <Typography component="span">{`${moment(
              localComment.createdAt
            ).format('MMM Do YY, h:mm a')}`}</Typography>
            <Button
              variant="text"
              color="secondary"
              endIcon={<ReplyIcon />}
              onClick={() => onOpenReply(localComment.id)}>
              Ответить
            </Button>
          </Box>
        </Box>
        <Box className={styles.reactionBox}>
          <ReactionBox
            reactions={localComment.reactions}
            isUserInReaction={index =>
              emojiService!.getIndexCurrentUserInReactions(index) !== -1
            }
            handleReactionClick={handleReactionClick}
          />
        </Box>
      </Box>
      {openedId === localComment.id && (
        <ReplyCommentForm fetchTopic={fetchTopic} commentId={localComment.id} />
      )}
      {sortedReplies.map(reply => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </>
  );
};

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
import { FC, useMemo, useState } from 'react';
import moment from 'moment';
import { Reply } from './Reply';
import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';

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
    setLocalComment(prevComment => ({
      ...prevComment,
      reactions: newReactions,
    }));
  };

  const addNewReaction = (reaction: string): void => {
    let indexIfAlreadyContains = null;
    localComment?.reactions?.map((item, index) => {
      if (item.reaction !== reaction) return;

      indexIfAlreadyContains = index;
    });

    if (indexIfAlreadyContains !== null) {
      if (checkCurrentUserExistInReactions(indexIfAlreadyContains)) {
        deleteReaction(indexIfAlreadyContains);
        return;
      }

      const newReactions = [...localComment.reactions];
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
      localComment.reactions.concat({
        reaction: reaction,
        users: [currentUser.id],
      })
    );
  };

  const handleReactionClick = (index: number): void => {
    const indexIfAlreadyContainsInUser = localComment.reactions[
      index
    ].users.indexOf(currentUser.id);

    if (indexIfAlreadyContainsInUser === -1) {
      addNewReaction(localComment.reactions[index].reaction);
      return;
    }

    deleteReaction(index);
  };

  const deleteReaction = (index: number): void => {
    const indexIfAlreadyContainsInUser = localComment.reactions[
      index
    ].users.indexOf(currentUser.id);

    const newReactions = [...localComment.reactions];
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
    return localComment.reactions[index].users.indexOf(currentUser?.id) !== -1;
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
          {localComment.reactions.length
            ? localComment.reactions.map((reaction, index) => (
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
      {openedId === localComment.id && (
        <ReplyCommentForm fetchTopic={fetchTopic} commentId={localComment.id} />
      )}
      {sortedReplies.map(reply => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </>
  );
};

export type TopicData = {
  title: string;
  description: string;
  userId: number;
};
export type TopicResponse = {
  title: string;
  description: string;
  userId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
};
export type CommentData = {
  content: string;
  topicId: number;
  userId: number;
};
export type ReplyCommentData = {
  content: string;
  commentId: number;
  userId: number;
};

export const isTopicResponse = (value: unknown): value is TopicResponse => {
  return !!value && !!(value as TopicResponse)?.id;
};

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

export type ReplyCommentData = {
  content: string;
  commentId: number;
  userId: number;
};

export type SearchData = {
  searchTitle: string;
};

export type CommentResponse = {
  content: string;
  topicId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  replies: Array<ReplyResponse>;
};

export type CommentData = {
  topicId: string;
};
export type TopicWithComments = TopicResponse & {
  comments: Array<CommentResponse>;
};

export type ReplyData = {
  content: string;
  commentId: string;
  userId: string;
};
export type ReplyResponse = {
  commentId: string;
  content: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
};

export const isTopicResponse = (value: unknown): value is TopicResponse => {
  return !!value && !!(value as TopicResponse)?.id;
};
export const isTopicArrayResponse = (
  value: unknown
): value is Array<TopicResponse> => {
  return (
    Array.isArray(value) && value.every(item => !!(item as TopicResponse)?.id)
  );
};

export const isCommentResponse = (value: unknown): value is CommentResponse => {
  return !!value && !!(value as CommentResponse)?.topicId;
};
export const isCommentArrayResponse = (
  value: unknown
): value is Array<CommentResponse> => {
  return (
    Array.isArray(value) &&
    value.every(item => !!(item as CommentResponse)?.topicId)
  );
};

export const isReplyResponse = (value: unknown): value is ReplyData => {
  return !!value && !!(value as ReplyData)?.commentId;
};

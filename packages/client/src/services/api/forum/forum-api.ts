import {
  CommentData,
  ReplyData,
  SearchData,
  TopicData,
  TopicResponse,
} from '@/types/forum/api';
import { BaseServerApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';

class ForumApi extends BaseServerApi {
  constructor() {
    super('api/');
  }

  sendReply = (data: ReplyData) =>
    this.http.post<ReplyData, AxiosResponse<ReplyData>>('reply', data);

  getComments = (data: CommentData) =>
    this.http.get<CommentData, AxiosResponse<TopicResponse>>('comment', data);

  createComment = (data: CommentData) =>
    this.http.post<CommentData, AxiosResponse<CommentData>>('comment', data);

  getTopicById = (id: string) =>
    this.http.get<undefined, AxiosResponse<TopicResponse>>(`topic/${id}`);

  getTopics = (data?: SearchData) =>
    this.http.get<SearchData, AxiosResponse<TopicResponse>>('topic', data);

  createTopic = (data: TopicData) =>
    this.http.post<TopicData, AxiosResponse<TopicData>>('topic', data);
}

export const forumApi = new ForumApi();

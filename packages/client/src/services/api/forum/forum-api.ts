import { TopicData } from '@/types/forum/api';
import { BaseServerApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';

class ForumApi extends BaseServerApi {
  constructor() {
    super('api/');
  }

  createTopic = (data: TopicData) =>
    this.http.post<TopicData, AxiosResponse<TopicData>>('topic', data);
}

export const forumApi = new ForumApi();

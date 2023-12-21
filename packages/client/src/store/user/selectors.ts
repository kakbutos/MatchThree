import { LoadingStatus } from '@/types/loading-status';
import { RootState } from '..';

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsLoading = (state: RootState) =>
  state.user.status === LoadingStatus.LOADING;
export const selectStatus = (state: RootState) => state.user.status;

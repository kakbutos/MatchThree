import { ReactionData } from '@/types/forum/api';

interface EmojiServiceProps {
  currentUserId: number;
  reactions: ReactionData[];
  setReactions: (updatedReactions: ReactionData[]) => void;
}

export class EmojiServiceCommand {
  public currentUserId: number;
  public reactions: ReactionData[];
  public setReactions: (updatedReactions: ReactionData[]) => void;

  public constructor(
    currentUserId: number,
    reactions: ReactionData[],
    setReactions: (updatedReactions: ReactionData[]) => void
  ) {
    this.currentUserId = currentUserId;
    this.reactions = reactions;
    this.setReactions = setReactions;
  }
}

class EmojiService {
  private currentUserId: number;
  private reactions: ReactionData[];
  private setReactions: (updatedReactions: ReactionData[]) => void;

  constructor({ currentUserId, reactions, setReactions }: EmojiServiceCommand) {
    this.currentUserId = currentUserId;
    this.reactions = reactions;
    this.setReactions = setReactions;
  }

  private updateReactions(updatedReactions: ReactionData[]): void {
    this.setReactions(updatedReactions);
  }

  public getReactionIndex(reaction: string): number {
    return this.reactions.findIndex(item => item.reaction === reaction);
  }

  public getIndexCurrentUserInReactions(index: number): number {
    return this.reactions[index].users.indexOf(this.currentUserId);
  }

  public addNewReaction(reaction: string): void {
    const reactionIndex = this.getReactionIndex(reaction);

    if (reactionIndex !== -1) {
      if (this.getIndexCurrentUserInReactions(reactionIndex) !== -1) {
        this.deleteReaction(reactionIndex);
        return;
      }

      const newReactions = [...this.reactions];

      newReactions[reactionIndex] = {
        ...newReactions[reactionIndex],
        users: newReactions[reactionIndex].users.concat(this.currentUserId),
      };

      this.updateReactions(newReactions);
      return;
    }

    this.updateReactions(
      this.reactions.concat([
        {
          reaction: reaction,
          users: [this.currentUserId],
        },
      ])
    );
  }

  public handleReactionClick(index: number): void {
    if (this.getIndexCurrentUserInReactions(index) === -1) {
      this.addNewReaction(this.reactions[index].reaction);
      return;
    }

    this.deleteReaction(index);
  }

  public deleteReaction(index: number): void {
    const newReactions = [...this.reactions];
    const newUsers = [...newReactions[index].users];

    newUsers.splice(this.getIndexCurrentUserInReactions(index), 1);
    newReactions[index] = {
      ...newReactions[index],
      users: newUsers,
    };

    if (!newReactions[index].users.length) {
      newReactions.splice(index, 1);
    }

    this.updateReactions(newReactions);
  }
}

export default EmojiService;

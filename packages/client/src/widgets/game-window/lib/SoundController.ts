import { SoundTypes } from '../types/sound-types.enum';
import soundMove from '@/assets/audio/tileMove.mp3';
import soundWrongMove from '@/assets/audio/wrongMove.mp3';
import soundGameOver from '@/assets/audio/gameOver.mp3';
import soundClusterRemove from '@/assets/audio/clusterMatch.mp3';
import soundBonus from '@/assets/audio/BONUS.mp3';
import toggleSound from '@/assets/audio/toggleSound.mp3';

class SoundController {
  private audioMap: Map<SoundTypes, HTMLAudioElement>;
  private volume: number;

  constructor() {
    this.audioMap = new Map<SoundTypes, HTMLAudioElement>();
    this.volume = 1;

    this.loadAllSound();
  }

  private loadAllSound() {
    this.loadSound(SoundTypes.MOVE, soundMove);
    this.loadSound(SoundTypes.REMOVE, soundClusterRemove);
    this.loadSound(SoundTypes.BONUS1, soundBonus);
    this.loadSound(SoundTypes.WRONG_MOVE, soundWrongMove);
    this.loadSound(SoundTypes.GAME_OVER, soundGameOver);
    this.loadSound(SoundTypes.TOGGLE_SOUND, toggleSound);
  }

  private loadSound(soundType: SoundTypes, soundFile: string) {
    const audio = new Audio(soundFile);
    this.audioMap.set(soundType, audio);
  }

  public enableSound() {
    this.audioMap.forEach(audio => {
      audio.muted = false;
    });
  }

  public disableSound() {
    this.audioMap.forEach(audio => {
      audio.muted = true;
    });
  }

  public setVolume(volume: number) {
    if (volume < 0 || volume > 1) {
      throw new Error('Volume value should be between 0 and 1');
    }

    this.volume = volume;
    this.audioMap.forEach(audio => {
      audio.volume = volume;
    });
  }

  public increaseVolume() {
    if (this.volume < 1) {
      const newVolume = Math.min(1, this.volume + 0.1);
      this.setVolume(newVolume);
    }
  }

  public decreaseVolume() {
    if (this.volume > 0) {
      const newVolume = Math.max(0, this.volume - 0.1);
      this.setVolume(newVolume);
    }
  }

  public playSound(soundType: SoundTypes) {
    const audio = this.audioMap.get(soundType);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  }
}

export default SoundController;

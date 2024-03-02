import mercury from '../../../assets/images/mercury.png';
import uranus from '../../../assets/images/uranus.png';
import jupiter from '../../../assets/images/jupiter.png';
import earth from '../../../assets/images/earth.png';
import moon from '../../../assets/images/moon.png';
import mars from '../../../assets/images/mars.png';
import neptune from '../../../assets/images/neptune.png';

export class TilesThemes {
  static readonly DEFAULT: number[][] = [
    [219, 138, 110],
    [77, 177, 120],
    [225, 210, 150],
    [66, 142, 211],
    [166, 162, 162],
    [174, 37, 48],
    [151, 196, 235],
  ];

  static readonly DEFAULT_IMAGES: string[] = [
    mercury,
    uranus,
    jupiter,
    earth,
    moon,
    mars,
    neptune,
  ];

  static readonly BLISS: number[][] = [
    [225, 165, 143],
    [212, 99, 89],
    [194, 202, 214],
    [238, 209, 202],
    [118, 143, 190],
    [159, 184, 219],
  ];

  static readonly VINTAGE: number[][] = [
    [216, 152, 102],
    [107, 107, 72],
    [206, 72, 50],
    [223, 204, 178],
    [233, 169, 61],
    [108, 42, 53],
  ];

  static readonly CANDY: number[][] = [
    [194, 239, 245],
    [61, 230, 230],
    [101, 166, 244],
    [244, 221, 244],
    [238, 159, 201],
    [245, 91, 235],
  ];
}

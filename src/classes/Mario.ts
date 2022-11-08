import Coordinate from "./Coordinate";

export const STAR_DEFAULT_DURATION = 6;
export const FLOWER_DEFAULT_SHOTS = 1;

interface Powers {
  star: {
    durationLeft: number;
    isPoweredUp: boolean;
  };
  flower: {
    shotsLeft: number;
    isPoweredUp: boolean;
  };
}

const INITIAL_POWERUPS: Powers = {
  star: {
    durationLeft: 0,
    isPoweredUp: false,
  },
  flower: {
    shotsLeft: 0,
    isPoweredUp: false,
  },
};

class Mario {
  private static _position: Coordinate;
  private static _powerUps: Powers = INITIAL_POWERUPS;

  constructor(position: Coordinate) {
    Mario._position = position;
  }

  static set position(position: Coordinate) {
    Mario._position = position;
  }

  static get position(): Coordinate {
    return Mario._position;
  }

  static get powerUps(): Powers {
    return Mario._powerUps;
  }

  static hasStar(): boolean {
    if (this._powerUps.star.isPoweredUp) {
      Mario.useStarPowerUp();
      return true;
    }
    return false;
  }

  static hasFlower(): boolean {
    if (this._powerUps.flower.isPoweredUp) {
      Mario.useFlowerPowerUp();
      return true;
    }
    return false;
  }

  static foundStarPowerUp(): void {
    const HAS_FLOWER: boolean = Mario._powerUps.flower.isPoweredUp;
    if (HAS_FLOWER) return;

    Mario._powerUps = {
      ...Mario._powerUps,
      star: {
        durationLeft: Mario._powerUps.star.durationLeft + STAR_DEFAULT_DURATION,
        isPoweredUp: true,
      },
    };
  }

  static foundFlowerPowerUp(): void {
    const HAS_STAR: boolean = Mario._powerUps.star.isPoweredUp;
    if (HAS_STAR) return;

    Mario._powerUps = {
      ...Mario._powerUps,
      flower: {
        shotsLeft: Mario._powerUps.flower.shotsLeft + FLOWER_DEFAULT_SHOTS,
        isPoweredUp: true,
      },
    };
  }

  private static useStarPowerUp(): void {
    Mario._powerUps.star.durationLeft -= 1;
    Mario._powerUps.star.isPoweredUp = Mario.isStarAvailable();
  }

  private static useFlowerPowerUp(): void {
    Mario._powerUps.flower.shotsLeft -= 1;
    Mario._powerUps.flower.isPoweredUp = Mario.isFlowerAvailable();
  }

  private static isStarAvailable(): boolean {
    return Mario._powerUps.star.durationLeft !== 0;
  }

  private static isFlowerAvailable(): boolean {
    return Mario._powerUps.flower.shotsLeft !== 0;
  }

  static reset() {
    Mario._powerUps = INITIAL_POWERUPS;
  }
}

export default Mario;

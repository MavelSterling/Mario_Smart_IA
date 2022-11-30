import Coordinate from "./Coordinate";

// Cada estrella dura 6 casillas
export const STAR_DEFAULT_DURATION = 6;

// Al tener la flor el costo es 1
export const FLOWER_DEFAULT_SHOTS = 1;
// si el costo es 2
//export const FLOWER_DEFAULT_SHOTS = 2;


// declaracion de los campos de los poderes
interface Powers {
  star: {
    durationLeft: number; // duracion de la izquierda
    isPoweredUp: boolean;
  };
  flower: {
    shotsLeft: number; // disparo a la izquierda
    isPoweredUp: boolean;
  };
}

// valores iniciales de los poderes
// en la variable INITIAL_POWERUPS
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

  // variables estaticas: coordenadas y valores iniciales de los poderes
  private static _position: Coordinate;
  private static _powerUps: Powers = INITIAL_POWERUPS;

  constructor(position: Coordinate) {
    Mario._position = position;
  }

  // actualiza la posicion (coordenadas x,y)
  static set position(position: Coordinate) {
    Mario._position = position;
  }

  // devuelve la posición (coordenadas x,y)
  static get position(): Coordinate {
    return Mario._position;
  }

  // devuelve el valor de los poderes
  static get powerUps(): Powers {
    return Mario._powerUps;
  }

  // variable estatica si tiene la estrella, es un boolean
  // en el caso que la tenga la tiene que utilizar 
  // caso contrario devuelve false
  static hasStar(): boolean {
    if (this._powerUps.star.isPoweredUp) {
      Mario.useStarPowerUp();
      return true;
    }
    return false;
  }


  // variable estatica si tiene la flor, es un boolean
  // en el caso que la tenga la tiene que utilizar 
  // caso contrario devuelve false
  static hasFlower(): boolean {
    if (this._powerUps.flower.isPoweredUp) {
      Mario.useFlowerPowerUp();
      return true;
    }
    return false;
  }


  // variable estatica de encontrar la estrella
  static foundStarPowerUp(): void {

    // se crea la variable si se tiene la flor (boolean)
    const HAS_FLOWER: boolean = Mario._powerUps.flower.isPoweredUp;

    // si Mario tiene la flor no se devuelve algo, se sigue igual
    if (HAS_FLOWER) return;

    // caso contrario Mario toma el poder de la estrella, con la duración de la estrella
    Mario._powerUps = {
      ...Mario._powerUps,
      star: {
        durationLeft: Mario._powerUps.star.durationLeft + STAR_DEFAULT_DURATION,
        isPoweredUp: true,
      },
    };
  }


  // variable estatica de encontrar la flor
  static foundFlowerPowerUp(): void {

    // se crea la variable si se tiene la flor (boolean)
    const HAS_STAR: boolean = Mario._powerUps.star.isPoweredUp;

    // si Mario tiene la estrella no se devuelve algo, se sigue igual
    if (HAS_STAR) return;

   // caso contrario Mario toma la bala de la flor 
    Mario._powerUps = {
      ...Mario._powerUps,
      flower: {
        shotsLeft: Mario._powerUps.flower.shotsLeft + FLOWER_DEFAULT_SHOTS,
        isPoweredUp: true,
      },
    };
  }

  // variable estatica de utilizar la estrella
  private static useStarPowerUp(): void {

    // al utilizar la estrella se disminuye 1 a la duración
    Mario._powerUps.star.durationLeft -= 1;

   // al utilizar la estrella se consulta si esta disponible
    Mario._powerUps.star.isPoweredUp = Mario.isStarAvailable();
  }

  // variable estatica de utilizar la flor
  private static useFlowerPowerUp(): void {

    // al utilizar la flor se disminuye 1 bala
    Mario._powerUps.flower.shotsLeft -= 1;

   // al utilizar la flor se consulta si hay balas disponibles
    Mario._powerUps.flower.isPoweredUp = Mario.isFlowerAvailable();
  }

  // variable estatica para saber si la estrella esta disponible
  private static isStarAvailable(): boolean {
    // si esta disponible la duración es distinta a cero
    return Mario._powerUps.star.durationLeft !== 0;
  }

  // variable estatica para saber si la flor esta disponible
  private static isFlowerAvailable(): boolean {

    // si esta disponible la cantidad de balas es distinta a cero
    return Mario._powerUps.flower.shotsLeft !== 0;
  }

  // variable estatica para reiniciar los poderes con los valores iniciales
  static reset() {
    Mario._powerUps = INITIAL_POWERUPS;
  }
}

export default Mario;

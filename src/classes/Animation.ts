import Algorithm from "../types/Algorithm";

export interface AnimationSetup {
  interval: number;
  algorithm: Algorithm;
}

class Animation {
  static interval: number;
  static algorithm: Algorithm;

  static setup({ interval, algorithm }: AnimationSetup) {
    Animation.interval = interval || 500;
    Animation.algorithm = algorithm;
  }
}

export default Animation;

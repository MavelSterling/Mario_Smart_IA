export interface AnimationSetup {
  interval: number;
}

class Animation {
  static interval: number;

  static setup({ interval }: AnimationSetup) {
    Animation.interval = interval || 500;
  }
}

export default Animation;

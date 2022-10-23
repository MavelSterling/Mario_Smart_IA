export interface AnimationSetup {
  interval: number;
}

class Animation {
  static interval: number;

  static setup({ interval }: AnimationSetup) {
    console.log({ interval });
    Animation.interval = interval || 500;
  }
}

export default Animation;

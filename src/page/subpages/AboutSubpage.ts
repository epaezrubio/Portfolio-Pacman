import Swipper, { Autoplay, EffectFade } from 'swiper';

import { BaseSubpage } from './BaseSubpage';

export class AboutSubpage extends BaseSubpage {
  private readonly swiper: Swipper;

  constructor(page: HTMLDivElement) {
    super(page);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const el = page.querySelector<HTMLDivElement>('#about-quotes-swiper')!;

    this.swiper = new Swipper(el, {
      modules: [EffectFade, Autoplay],
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 15000,
      },
    });

    this.swiper.autoplay.stop();
  }

  public onEnter(): void {
    this.swiper.autoplay.start();
  }

  public onExit(): void {
    this.swiper.autoplay.stop();
  }
}

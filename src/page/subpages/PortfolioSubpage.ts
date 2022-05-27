import Swipper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

import { BaseSubpage } from './BaseSubpage';

export class PortfolioSubpage extends BaseSubpage {
  private readonly swiper: Swipper;

  constructor(page: HTMLDivElement) {
    super(page);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const el = page.querySelector<HTMLDivElement>(
      '#portfolio-projects-swiper',
    )!;

    const slides = el.querySelectorAll<HTMLDivElement>('.swiper-slide');

    this.swiper = new Swipper(el, {
      modules: [EffectFade, Autoplay, Pagination, Navigation],
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: '.subpage--portfolio__gallery-arrow--left',
        nextEl: '.subpage--portfolio__gallery-arrow--right',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet(index): string {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const thumbnail = slides[index].getAttribute('data-thumbnail')!;

          return `<div class="swiper-pagination-bullet subpage--portfolio__gallery-thumbnail" style="background-image: url('${thumbnail}')"></div>`;
        },
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

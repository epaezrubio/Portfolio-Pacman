import type { ApplicationInjects } from '../../types';

import { LinksHandler } from './LinksHandler';

export class FixedMenuHandler {
  private readonly menu: HTMLDivElement;

  private readonly links: NodeListOf<HTMLAnchorElement>;

  private readonly linksHandler: LinksHandler;

  constructor(injects: ApplicationInjects) {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.menu = document.querySelector('#fixed-menu')!;
    this.links = this.menu.querySelectorAll('a');

    this.linksHandler = new LinksHandler(injects, this.links);
  }

  public addMenuEventHandlers(): void {
    this.linksHandler.addEventHandlers();
  }

  public enableLinks(): void {
    this.linksHandler.enableLinks();
  }

  public disableLinks(): void {
    this.linksHandler.disableLinks();
  }
}

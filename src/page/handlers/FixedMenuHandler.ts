import type { ApplicationInjects } from '../../types';

import { LinksHandler } from './LinksHandler';

export class FixedMenuHandler {
  private readonly menu: HTMLDivElement;

  private readonly links: NodeListOf<HTMLAnchorElement>;

  private readonly linksHandler: LinksHandler;

  constructor(injects: ApplicationInjects, navigate: (target: string) => void) {
    const menu = document.querySelector<HTMLDivElement>('#fixed-menu');

    if (!menu) {
      throw new Error(
        'FixedMenuHandler: Required DOM element #fixed-menu not found.',
      );
    }

    this.menu = menu;
    this.links = this.menu.querySelectorAll('a');

    this.linksHandler = new LinksHandler(injects, this.links, navigate);
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

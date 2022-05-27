import { effect } from '@vue/reactivity';

import { unusedTrack } from '../../shared/utils/reacitivity';
import type { ApplicationInjects } from '../../types';

import { LinksHandler } from './LinksHandler';

export class FloatingMenuHandler {
  private readonly injects: ApplicationInjects;

  private readonly menu: HTMLDivElement;

  private readonly toggleButton: HTMLLinkElement;

  private readonly links: NodeListOf<HTMLAnchorElement>;

  private readonly employerLink: HTMLAnchorElement;

  private readonly linksHandler: LinksHandler;

  private isVisibile = false;

  constructor(injects: ApplicationInjects) {
    this.injects = injects;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.toggleButton = document.querySelector('#menu-toggle-button')!;
    this.menu = document.querySelector('#floating-menu')!;
    this.links = this.menu.querySelectorAll('a');
    this.employerLink = document.querySelector('#employer-link')!;

    this.linksHandler = new LinksHandler(injects, this.links);

    effect(() => {
      unusedTrack(this.injects.state.route.currentRoute);

      this.hide();
    });
  }

  public addMenuEventHandlers(): void {
    this.menu.addEventListener('transitionend', () => {
      if (!this.isVisibile) {
        this.menu.classList.remove('floating-menu--visible-start');
      }
    });

    this.toggleButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();

      this.toggle();

      return false;
    });

    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 768 || document.body.clientHeight < 540) {
        return;
      }

      this.hide();
    });

    this.linksHandler.addEventHandlers();
  }

  public enableLinks(): void {
    this.linksHandler.enableLinks();
  }

  public disableLinks(): void {
    this.linksHandler.disableLinks();
  }

  public toggle(): void {
    if (this.isVisibile) {
      this.hide();
      return;
    }

    this.show();
  }

  public show(): void {
    if (this.isVisibile) {
      return;
    }

    this.isVisibile = true;

    this.employerLink.setAttribute('tabindex', '-1');

    this.toggleButton.classList.add('floating-menu__toggle-button--expanded');

    this.menu.classList.add('floating-menu--visible-start');

    setTimeout(() => {
      this.menu.classList.add('floating-menu--visible');
      this.menu.classList.remove('floating-menu--visible-start');
    });
  }

  public hide(): void {
    if (!this.isVisibile) {
      return;
    }

    this.isVisibile = false;

    this.employerLink.setAttribute('tabindex', '0');

    this.toggleButton.classList.remove(
      'floating-menu__toggle-button--expanded',
    );

    this.menu.classList.add('floating-menu--visible-start');
    this.menu.classList.remove('floating-menu--visible');
  }
}

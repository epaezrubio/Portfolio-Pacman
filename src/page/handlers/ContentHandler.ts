import type { IPointData } from 'pixi.js';

import type {
  EntityState,
  NpcEntityState,
} from '../../shared/state/game/types';
import { NpcEntityColor } from '../../shared/state/game/types';
import type { ApplicationInjects } from '../../types';
import { AboutSubpage } from '../subpages/AboutSubpage';
import type { BaseSubpage } from '../subpages/BaseSubpage';
import { PortfolioSubpage } from '../subpages/PortfolioSubpage';

export class ContentHandler {
  private static readonly fillMap: Record<NpcEntityColor, string> = {
    [NpcEntityColor.red]: '#ff0000',
    [NpcEntityColor.blue]: '#00ffde',
    [NpcEntityColor.pink]: '#ffb8de',
    [NpcEntityColor.orange]: '#ffb847',
  };

  /* eslint-disable @typescript-eslint/naming-convention */
  private static readonly controllersContructorsMap: Record<
    string,
    new (page: HTMLDivElement) => BaseSubpage
  > = {
    '/portfolio': PortfolioSubpage,
    '/about': AboutSubpage,
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  private readonly controllersMap: Record<string, BaseSubpage> = {};

  private readonly injects: ApplicationInjects;

  private readonly contentWrapper: HTMLDivElement;

  private readonly transitionElement: HTMLDivElement;

  private readonly transitionElementPath: SVGPathElement;

  private readonly canvas: HTMLCanvasElement;

  private readonly pages: NodeListOf<HTMLDivElement>;

  private currentPage: HTMLDivElement | null = null;

  private currentPageController: BaseSubpage | null = null;

  constructor(injects: ApplicationInjects) {
    this.injects = injects;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.contentWrapper =
      document.querySelector<HTMLDivElement>('#content-wrapper')!;
    this.transitionElement = document.querySelector<HTMLDivElement>(
      '#transition-element',
    )!;
    this.transitionElementPath = document.querySelector<SVGPathElement>(
      '#transition-element-path',
    )!;
    this.canvas = document.querySelector<HTMLCanvasElement>(
      '#canvas-app > canvas',
    )!;
    this.pages =
      this.contentWrapper.querySelectorAll<HTMLDivElement>(':scope > *');
  }

  public addEventHandlers(): void {
    const closeButtons = this.contentWrapper.querySelectorAll(
      '.subpage__close-button',
    );

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();

        this.injects.router.navigate('/');

        return false;
      });
    });
  }

  public addRouteHandlers(): void {
    this.pages.forEach((page) => {
      const route = page.getAttribute('data-route')!;

      if (route in ContentHandler.controllersContructorsMap) {
        this.controllersMap[route] =
          new ContentHandler.controllersContructorsMap[route](page);
      }

      this.injects.router.on(route, () => {
        if (!(route in this.controllersMap)) {
          this.currentPageController = null;
        } else {
          this.currentPageController = this.controllersMap[route];
          this.currentPageController.onEnter();
        }

        const content = page.querySelector('.subpage__content-wrapper')!;

        this.transitionPage(page);

        setTimeout(() => {
          content.scrollTo({ top: 0 });
        }, 60);
      });
    });
  }

  public initialTransition(): void {
    this.currentPage = this.getCurrentPage();

    this.immediateRevealPage(this.currentPage);
  }

  public initialControllerShow(): void {
    if (!this.currentPageController) {
      return;
    }

    this.currentPageController.onShow();
  }

  public async transitionPage(page: HTMLDivElement | null): Promise<void> {
    if (page === this.currentPage) {
      return;
    }

    await this.hideCurrentPage();

    if (page === null) {
      return;
    }

    await this.revealPage(page);
  }

  private getCurrentPage(): HTMLDivElement | null {
    const currentPath = window.location.pathname;

    if (!currentPath) {
      return null;
    }

    const pagesArray = Array.from(this.pages);

    for (const page of pagesArray) {
      const route = page.getAttribute('data-route');

      if (route === null) {
        continue;
      }

      if (route === currentPath) {
        return page;
      }
    }

    return null;
  }

  private async hideCurrentPage(): Promise<void> {
    if (!this.currentPage) {
      return;
    }

    if (this.currentPageController) {
      this.currentPageController.onExit();
    }

    const currentEntity = this.getRelatedNpcEntity(
      this.currentPage.getAttribute('data-route'),
    );

    if (!currentEntity) {
      this.transitionElement.style.transform = `translate(50vw, 50vw) scale(0)`;
      this.currentPage = null;

      return Promise.resolve();
    }

    const targetPosition = this.getEntityAbsolutePosition(currentEntity);

    const page = this.currentPage;

    this.transitionElement.style.transform = `translate(${targetPosition.x}px, ${targetPosition.y}px) scale(0)`;
    this.currentPage.style.opacity = '0';
    this.currentPage = null;

    setTimeout(() => {
      page.style.display = 'none';

      if (this.currentPageController) {
        this.currentPageController.onHide();
        this.currentPageController = null;
      }
    }, 300);

    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  private immediateRevealPage(page: HTMLDivElement | null): void {
    this.currentPage = page;

    const lastTransition = this.transitionElement.style.transition;
    this.transitionElement.style.transition = 'none';

    if (this.currentPage === null) {
      this.transitionElement.style.transform = 'translate(50vw, 50vh) scale(0)';
    } else {
      this.transitionElement.style.transform = 'translate(50vw, 50vh) scale(1)';
      this.currentPage.style.display = 'block';
      this.currentPage.style.opacity = '1';
    }

    setTimeout(() => {
      this.transitionElement.style.transition = lastTransition;
    });

    if (!this.currentPage) {
      return;
    }

    const currentEntity = this.getRelatedNpcEntity(
      this.currentPage.getAttribute('data-route'),
    )!;

    const targetTint = ContentHandler.fillMap[currentEntity.color];
    this.transitionElementPath.style.fill = targetTint;
  }

  private async revealPage(page: HTMLDivElement): Promise<void> {
    this.currentPage = page;

    const lastTransition = this.transitionElement.style.transition;

    const currentEntity = this.getRelatedNpcEntity(
      this.currentPage.getAttribute('data-route'),
    );

    if (!currentEntity) {
      return;
    }

    const targetPosition = this.getEntityAbsolutePosition(currentEntity);
    this.transitionElement.style.transition = `none`;
    this.transitionElement.style.transform = `translate(${targetPosition.x}px, ${targetPosition.y}px) scale(0)`;

    this.currentPage.style.opacity = '0';
    this.currentPage.style.display = 'block';

    const targetTint = ContentHandler.fillMap[currentEntity.color];
    this.transitionElementPath.style.fill = targetTint;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.transitionElement.style.transition = lastTransition;
        this.transitionElement.style.transform = `translate(50vw, 50vh) scale(1)`;

        setTimeout(() => {
          if (this.currentPage) {
            this.currentPage.style.opacity = '1';
          }

          if (this.currentPageController) {
            this.currentPageController.onShow();
          }
        }, 300);

        resolve();
      }, 50);
    });
  }

  private getRelatedNpcEntity(
    route: string | null,
  ): NpcEntityState | undefined {
    if (route === null) {
      return undefined;
    }

    const currentPageEntity = this.injects.state.game.npc.find((entity) => {
      return entity.route === route;
    });

    return currentPageEntity;
  }

  private getEntityAbsolutePosition(entity: EntityState): IPointData {
    const canvasRect = this.canvas.getBoundingClientRect();
    const grid = this.injects.state.grid;

    const canvasRatio = {
      x: canvasRect.width / (grid.cellSize * grid.width),
      y: canvasRect.height / (grid.cellSize * grid.height),
    };

    return {
      x: canvasRect.left + entity.x * canvasRatio.x,
      y: canvasRect.top + entity.y * canvasRatio.y,
    };
  }
}

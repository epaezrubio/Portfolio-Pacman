import type { ApplicationInjects } from '../../types';

export class LinksHandler {
  private readonly injects: ApplicationInjects;

  private readonly links: NodeListOf<HTMLAnchorElement>;

  constructor(
    injects: ApplicationInjects,
    links: NodeListOf<HTMLAnchorElement>,
  ) {
    this.injects = injects;
    this.links = links;
  }

  public addEventHandlers(): void {
    this.links.forEach((link) => {
      link.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();

        this.followLink(link);

        return false;
      });
    });
  }

  public enableLinks(): void {
    this.links.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
  }

  public disableLinks(): void {
    this.links.forEach((link) => {
      link.setAttribute('tabindex', '-1');
    });
  }

  private followLink(link: HTMLAnchorElement): void {
    const target = link.getAttribute('href');

    if (target === null) {
      return;
    }

    this.injects.router.navigate(target);
  }
}

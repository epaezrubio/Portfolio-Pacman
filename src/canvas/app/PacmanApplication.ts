import type Navigo from 'navigo';
import type { IApplicationOptions } from 'pixi.js';
import { Application } from 'pixi.js';

import type { ApplicationState } from '../../shared/state/types';

export interface PacmanApplicationOptions extends IApplicationOptions {
  state: ApplicationState;
  router: Navigo;
}

export class PacmanApplication extends Application {
  public readonly state: ApplicationState;

  public readonly router: Navigo;

  constructor(options: PacmanApplicationOptions) {
    super(options);

    this.state = options.state;
    this.router = options.router;
  }
}

import type { ReactiveEffectRunner } from '@vue/reactivity';
import { effect, stop } from '@vue/reactivity';
import type { IDestroyOptions } from 'pixi.js';
import { Container } from 'pixi.js';

import type { EntityState } from '../../../shared/state/game/types';
import type { PacmanApplication } from '../../app/PacmanApplication';

export abstract class Entity extends Container {
  protected readonly effects: ReactiveEffectRunner[] = [];

  protected readonly entityState: EntityState;

  protected readonly app: PacmanApplication;

  constructor(app: PacmanApplication, entityState: EntityState) {
    super();

    this.app = app;
    this.entityState = entityState;

    this.createEffects();
  }

  public destroy(options?: IDestroyOptions | boolean | undefined): void {
    this.effects.forEach((playerEffect) => {
      stop(playerEffect);
    });

    super.destroy(options);
  }

  protected createEffects(): void {
    this.effects.push(
      effect(() => {
        this.setPosition(this.entityState.x, this.entityState.y);
      }),
    );
  }

  private setPosition(x: number, y: number): void {
    this.position.set(x, y);
  }
}

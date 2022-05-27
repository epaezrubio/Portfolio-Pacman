import { config } from '../config';
import {
  pauseGameLoop,
  resumeGameLoop,
} from '../shared/state/game-loop/actions';
import { setEntityPosition, setNpcState } from '../shared/state/game/actions';
import { NpcState } from '../shared/state/game/types';
import { setCurrentRoute } from '../shared/state/route/actions';
import type { ApplicationInjects } from '../types';

import { ContentHandler } from './handlers/ContentHandler';
import { FixedMenuHandler } from './handlers/FixedMenuHandler';
import { FloatingMenuHandler } from './handlers/FloatingMenuHandler';

export function init(injects: ApplicationInjects): void {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const employerLink = document.querySelector('#employer-link')!;
  const contentHandler = new ContentHandler(injects);
  const floatingMenuHandler = new FloatingMenuHandler(injects);
  const fixedMenuHandler = new FixedMenuHandler(injects);

  floatingMenuHandler.addMenuEventHandlers();
  fixedMenuHandler.addMenuEventHandlers();
  contentHandler.addEventHandlers();

  injects.router.hooks({
    before: (next, match) => {
      setCurrentRoute(injects.state.route, match.url);

      if (match.url === '/' || match.url === '') {
        employerLink.setAttribute('tabindex', '0');
        floatingMenuHandler.enableLinks();
        fixedMenuHandler.enableLinks();

        resumeGameLoop(injects.state.gameLoop);

        if (injects.state.game.player.collision) {
          setNpcState(injects.state.game.player.collision, NpcState.respawning);

          const respawnXOffset = Math.random() >= 0.5 ? -0.5 : 0.5;

          setEntityPosition(
            injects.state.game.player.collision,
            (config.respawnLocation.x + respawnXOffset) *
              injects.state.grid.cellSize,
            config.respawnLocation.y * injects.state.grid.cellSize,
          );

          injects.state.game.player.collision = null;
        }

        document.body.classList.add('has-menu-toggle');
      } else {
        employerLink.setAttribute('tabindex', '-1');
        floatingMenuHandler.disableLinks();
        fixedMenuHandler.disableLinks();

        pauseGameLoop(injects.state.gameLoop);

        document.body.classList.remove('has-menu-toggle');
      }

      next();
    },
  });

  injects.router.on('/', () => {
    contentHandler.transitionPage(null);
  });

  contentHandler.addRouteHandlers();
  contentHandler.initialTransition();

  injects.router.resolve();

  contentHandler.initialControllerShow();
}

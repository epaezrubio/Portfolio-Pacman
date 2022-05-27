import './styles/style.scss';

import { effect } from '@vue/reactivity';
import { initSwipe } from 'swipe-mobile';

import { init as initCanvas } from './canvas';
import { config } from './config';
import { init as initPage } from './page';
import map from './resources/map.json';
import { createRouter } from './shared/router';
import { createState } from './shared/state';
import {
  randomizeEntityPosition,
  setPlayerDirection,
  tickApplication,
} from './shared/state/actions';
import { registerNpc, setEntityPosition } from './shared/state/game/actions';
import { Direction, NpcEntityColor } from './shared/state/game/types';
import { createGrid, setCellsValues } from './shared/state/grid/actions';
import type { Cell } from './shared/state/grid/types';
import { createTicker } from './shared/ticker';
import type { ApplicationInjects } from './types';

const state = createState();
const router = createRouter();
const ticker = createTicker();

const injects: ApplicationInjects = {
  state,
  router,
  ticker,
};

function initState(): void {
  createGrid(state.grid, map.width, map.height, 30, 3);

  setCellsValues(state.grid, map.cells as Cell[]);

  const npcEntity1 = registerNpc(
    state.game,
    'npc1',
    NpcEntityColor.red,
    '/about',
  );
  const npcEntity2 = registerNpc(
    state.game,
    'npc2',
    NpcEntityColor.pink,
    '/portfolio',
  );
  const npcEntity3 = registerNpc(
    state.game,
    'npc3',
    NpcEntityColor.orange,
    '/contact',
  );
  const npcEntity4 = registerNpc(
    state.game,
    'npc3',
    NpcEntityColor.blue,
    '/cv',
  );

  randomizeEntityPosition(state, npcEntity1);
  randomizeEntityPosition(state, npcEntity2);
  randomizeEntityPosition(state, npcEntity3);
  randomizeEntityPosition(state, npcEntity4);
  setEntityPosition(
    state.game.player,
    (state.grid.cellSize * state.grid.width) / 2,
    (state.grid.cellSize * (state.grid.height + 4)) / 2,
  );
}

function initEffects(): void {
  effect(() => {
    const playerCollision = state.game.player.collision;

    if (playerCollision === null) {
      return;
    }

    router.navigate(playerCollision.route);
  });
}

function initKeyPressEvents(): void {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.location.pathname !== router.root) {
      router.navigate('/');
    }

    if (state.gameLoop.paused) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        setPlayerDirection(state.game, Direction.up);
        break;
      case 'ArrowDown':
        setPlayerDirection(state.game, Direction.down);
        break;
      case 'ArrowLeft':
        setPlayerDirection(state.game, Direction.left);
        break;
      case 'ArrowRight':
        setPlayerDirection(state.game, Direction.right);
        break;
    }
  });
}

function initSwipeEvents(): void {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const canvas = document.querySelector<HTMLCanvasElement>(
    '#canvas-app > canvas',
  )!;

  const { top, left, right, bottom } = initSwipe(canvas);

  top((event) => {
    if (event.distance < 10) {
      return;
    }

    setPlayerDirection(state.game, Direction.up);
  });

  right((event) => {
    if (event.distance < 10) {
      return;
    }

    setPlayerDirection(state.game, Direction.right);
  });

  bottom((event) => {
    if (event.distance < 10) {
      return;
    }

    setPlayerDirection(state.game, Direction.down);
  });

  left((event) => {
    if (event.distance < 10) {
      return;
    }

    setPlayerDirection(state.game, Direction.left);
  });
}

function init(): void {
  initState();
  initEffects();
  initKeyPressEvents();

  initCanvas(injects);
  initPage(injects);

  initSwipeEvents();

  ticker.add(() => {
    if (state.gameLoop.paused) {
      return;
    }

    if (
      Date.now() - state.gameLoop.lastResume <
      config.pageTransitionDuration
    ) {
      return;
    }

    tickApplication(state);
  });
}

init();

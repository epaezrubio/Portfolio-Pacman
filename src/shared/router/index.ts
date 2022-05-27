import Navigo from 'navigo';

export function createRouter(): Navigo {
  const router = new Navigo('/');

  router.notFound(() => {
    router.navigate('/', { historyAPIMethod: 'replaceState' });
  });

  return router;
}

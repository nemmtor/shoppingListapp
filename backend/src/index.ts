import { app } from './app';

(async (): Promise<void> => {
  app.listen(4000, () => {
    console.log('Server listening at port 4000.');
  });
})();

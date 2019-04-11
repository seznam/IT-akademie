import Router from 'ima/router/Router';
import Window from 'ima/window/Window';

export default (ns, oc, config) => {
  // jshint ignore:line
  let $window = oc.get(Window);
  let $router = oc.get(Router);

  config.$IMA.fatalErrorHandler = error => {
    console.error('FATAL ERROR HANDLER:', error);
  };

  $window.bindEventListener($window.getWindow(), 'error', event => {
    let error = event.error;

    if (!error) {
      return;
    }

    $router.handleError({ error }).catch(fatalError => {
      config.$IMA.fatalErrorHandler(fatalError);
    });
  });

  $window.bindEventListener(
    $window.getWindow(),
    'unhandledrejection',
    event => {
      console.log(event);
    }
  );
};

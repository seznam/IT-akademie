import { Login } from '#/components/organism';
import WidgetContext from '#/components/WidgetContext';
import { modalSlotFactory } from '#/slots/ModalSlot/ModalSlot';

import ErrorView from './ErrorView';

async function viewFactory(widget) {
  const slots = (await Promise.all([modalSlotFactory(widget)])).reduce(
    (acc, cur) => {
      acc[cur.name] = cur;

      return acc;
    },
    {}
  );

  return {
    View,
    slots,
  };
}

function View(widget) {
  if (widget.error && widget.error.status) {
    return <ErrorView error={widget.error} />;
  }

  return (
    <WidgetContext.Provider value={widget}>
      <div className='m-merkur-login'>
        <Login />
      </div>
    </WidgetContext.Provider>
  );
}

export { viewFactory };
export default View;

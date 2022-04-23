import { LoginModal } from '#/components/organism';
import WidgetContext from '#/components/WidgetContext';

async function modalSlotFactory() {
  return {
    name: 'modal',
    View: ModalSlot,
  };
}

function ModalSlot(widget) {
  if (widget.error && widget.error.status) {
    return null;
  }

  if (!widget.state.isModalOpened) {
    return null;
  }

  return (
    <WidgetContext.Provider value={widget}>
      <div className='m-merkur-login'>
        <LoginModal />
      </div>
    </WidgetContext.Provider>
  );
}

export { modalSlotFactory };
export default ModalSlot;

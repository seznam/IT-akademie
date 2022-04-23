import { useContext, useState } from 'preact/hooks';

import { Modal } from '#/components/atom';
import { LoginForm } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

export default function LoginModal() {
  const widget = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      await widget.login(data);
      widget.closeModal();
    } catch (error) {
      setError(error?.response?.body?.message ?? 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title='Sign in' onBackdrop={widget.closeModal}>
      <LoginForm
        isLoading={isLoading}
        disabled={isLoading}
        error={error}
        onSubmit={handleSubmit}
        onCancel={widget.closeModal}
      />
    </Modal>
  );
}

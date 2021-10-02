import { useCallback, useContext, useMemo, useState } from 'preact/hooks';

import WidgetContext from './WidgetContext';

function useWidget() {
  const widget = useContext(WidgetContext);

  return useMemo(
    () => ({
      widget,
      openModal: widget.openModal,
      closeModal: widget.closeModal,
      setState: widget.setState,
      login: widget.login,
      logout: widget.logout,
      check: widget.check,
    }),
    [widget]
  );
}

function useLogin() {
  const { setState, login } = useWidget();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginCallback = async ({ username, password }) => {
    try {
      setIsLoading(true);
      await login({ username, password });

      setState({
        isModalVisible: false,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login: loginCallback, isLoading, error };
}

function useLogout() {
  const { logout } = useWidget();
  const [isLoading, setIsLoading] = useState(false);

  const logoutCallback = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  }, [logout]);

  return { logout: logoutCallback, isLoading };
}

function useCheck() {
  const { check } = useWidget();
  const [isLoading, setIsLoading] = useState(true);

  const checkCallback = useCallback(async () => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return null;
    }

    check()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [check]);

  return { check: checkCallback, isLoading };
}

export { useWidget, useLogin, useLogout, useCheck };

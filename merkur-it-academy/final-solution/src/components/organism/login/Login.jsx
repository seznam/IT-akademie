import { useContext, useEffect, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { User } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

import './login.less';

export default function Login() {
  const widget = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        await widget.check();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return widget.state.user ? (
    <User />
  ) : (
    <div className='m-login__button'>
      <TextButton disabled={isLoading} onClick={widget.openModal}>
        Sign in
      </TextButton>
    </div>
  );
}

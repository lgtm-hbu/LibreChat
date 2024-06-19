import { useEffect } from 'react';
import { ThemeSelector } from '~/components/ui';
import { useLocalize, useThemeContext, isDark } from '~/hooks';
import { BlinkAnimation } from './BlinkAnimation';
import { TStartupConfig } from 'librechat-data-provider';
import SocialLoginRender from './SocialLoginRender';
import Footer from './Footer';

const ErrorRender = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-16 flex justify-center">
    <div
      className="rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200"
      role="alert"
    >
      {children}
    </div>
  </div>
);

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: string | null;
}) {
  const localize = useLocalize();
  const { theme } = useThemeContext();

  const DisplayError = () => {
    if (startupConfigError !== null && startupConfigError !== undefined) {
      return <ErrorRender>{localize('com_auth_error_login_server')}</ErrorRender>;
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <ErrorRender>
          {localize('com_auth_error_invalid_reset_token')}{' '}
          <a className="font-semibold text-green-600 hover:underline" href="/forgot-password">
            {localize('com_auth_click_here')}
          </a>{' '}
          {localize('com_auth_to_try_again')}
        </ErrorRender>
      );
    } else if (error) {
      return <ErrorRender>{localize(error)}</ErrorRender>;
    }
    return null;
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-surface-primary"
      style={{
        backgroundImage: `url(/assets/stars-${isDark(theme) ? 'dark' : 'light'}.png)`,
        backgroundSize: '30%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0% bottom 0%',
      }}
    >
      <BlinkAnimation active={isFetching}>
        <div className="mt-12 h-24 w-full bg-cover">
          <img
            src={`/assets/rippl-${isDark(theme) ? 'dark' : 'light'}.svg`}
            className="h-full w-full object-contain"
            alt="Logo"
          />
        </div>
      </BlinkAnimation>
      <DisplayError />
      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="mb-20 flex flex-grow items-center justify-center md:mb-32">
        <div className="w-authPageWidth overflow-hidden bg-transparent px-6 py-4 sm:max-w-md sm:rounded-lg ">
          {!startupConfigError && !isFetching && (
            <h1
              className="mb-4 text-center font-playfair text-2xl text-text-primary"
              style={{ userSelect: 'none' }}
            >
              {header}
            </h1>
          )}
          {children}
          {(pathname.includes('login') || pathname.includes('register')) && (
            <SocialLoginRender startupConfig={startupConfig} />
          )}
        </div>
      </div>
      <Footer startupConfig={startupConfig} />
    </div>
  );
}

export default AuthLayout;

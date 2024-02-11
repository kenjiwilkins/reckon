import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import AppContainer from '@/components/appContainer';
import AppImage from '@/components/appImage';
import TextInput from '@/components/textInput';
import { InputLabel } from '@/components/inputLabel';
import { Divider } from '@/components/divider';
import { PrimaryButton } from '@/components/primaryButton';
import { authenticate } from '@/utils/signup';
import { validateEmail, validatePasswordOnLogin } from '@/utils/validator';

function App() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  async function login(event: FormEvent) {
    event.preventDefault();
    try {
      await authenticate(email, password);
      const redirectUrl =
        router.query.redirectUrl || process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL || '/';
      router.push(redirectUrl as string);
    } catch (error) {
      console.log('error', error);
      setErrorMessage('Invalid email or password');
    }
  }

  return (
    <>
      <AppContainer>
        <div id="form_container" className="px-auto flex w-500px">
          <div id="form" className="w-500px grow shadow-lg">
            <AppImage />
            <form onSubmit={login}>
              <fieldset className="px-16">
                <InputLabel
                  variant={
                    emailFocused ? 'focus' : !isEmailValid && email.length ? 'error' : 'default'
                  }>
                  Email Address
                </InputLabel>
                <TextInput
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(input: string) => {
                    setEmail(input);
                    setIsEmailValid(validateEmail(input));
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <Divider
                  variant={
                    emailFocused ? 'focus' : !isEmailValid && email.length ? 'error' : 'default'
                  }
                />
                <InputLabel
                  variant={
                    passwordFocused
                      ? 'focus'
                      : !isPasswordValid && password.length
                        ? 'error'
                        : 'default'
                  }>
                  Password
                </InputLabel>
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(input: string) => {
                    setPassword(input);
                    setIsPasswordValid(validatePasswordOnLogin(input));
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <Divider
                  variant={passwordFocused ? 'focus' : password.length ? 'error' : 'default'}
                />
                <div className="mt-9">
                  <PrimaryButton
                    variant={isEmailValid && password.length ? 'primary' : 'secondary'}
                    type="submit"
                    disabled={!email.length || !password.length}
                    onClick={login}
                    onSubmit={login}>
                    <span>Login</span>
                  </PrimaryButton>
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="text-red-600">{errorMessage}</span>
                </div>
              </fieldset>
            </form>
            <div id="form_footer" className="mx-16 mb-12 mt-6 text-center">
              <button className="bg-white text-sm font-light text-blue-400">
                <span>forgot your password?</span>
              </button>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-4 flex h-4 w-full justify-start">
          <span>@2023 by Kenji Wilkins.</span>
        </footer>
      </AppContainer>
    </>
  );
}

export default App;

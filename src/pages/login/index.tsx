import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContainer } from '@/components/appContainer';
import { TextInput } from '@/components/textInput';
import { InputLabel } from '@/components/inputLabel';
import { Divider } from '@/components/divider';
import { PrimaryButton } from '@/components/primaryButton';
import { authenticate } from '@/utils/signup';
import { validateEmail, validatePasswordOnLogin } from '@/utils/validator';

function App() {
  const router = useRouter();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  async function login(event: FormEvent) {
    event.preventDefault();
    try {
      await authenticate(email, password);
      const redirectUrl =
        router.query.redirectUrl || process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL || '/';
      router.push({
        pathname: redirectUrl as string,
        query: {
          ...router.query
        }
      });
    } catch (error) {
      console.log('error', error);
      setErrorMessage('Invalid email or password');
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AppContainer>
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
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={(event) => {
                setEmail(event.target.value);
                setIsEmailValid(validateEmail(event.target.value));
              }}
            />
            <Divider
              variant={emailFocused ? 'focus' : !isEmailValid && email.length ? 'error' : 'default'}
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
              onChange={(event) => {
                setPassword(event.target.value);
                setIsPasswordValid(validatePasswordOnLogin(event.target.value));
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <Divider variant={passwordFocused ? 'focus' : password.length ? 'error' : 'default'} />
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
      </AppContainer>
    </>
  );
}

export default App;

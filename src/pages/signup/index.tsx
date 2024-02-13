import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContainer } from '@/components/appContainer';
import { InputLabel } from '@/components/inputLabel';
import { TextInput } from '@/components/textInput';
import { Divider } from '@/components/divider';
import { PrimaryButton } from '@/components/primaryButton';
import { Typography } from '@/components/typography';
import { singup } from '@/utils/signup';
import {
  validateEmail,
  passwordLongEnough,
  passwordHasNumber,
  passwordHasMixedCase,
  passwordHasSpecialCharacter,
  validatePasswordOnSignup
} from '@/utils/validator';

function App() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      singup(email, password)
        .then((res) => {
          router.push({
            pathname: '/verify',
            query: {
              ...router.query,
              email: email
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AppContainer>
        <form action="">
          <fieldset className="px-16">
            <InputLabel
              variant={
                emailFocused ? 'focus' : !isEmailValid && email.length ? 'error' : 'default'
              }>
              Email Address
            </InputLabel>
            <TextInput
              name="email"
              type="email"
              placeholder="Email Address"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              autoFocus
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
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setIsPasswordValid(validatePasswordOnSignup(event.target.value));
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <Divider
              variant={
                passwordFocused
                  ? 'focus'
                  : !isPasswordValid && password.length
                    ? 'error'
                    : 'default'
              }
            />
            <Typography
              variant="caption"
              color={
                !password.length ? 'secondary' : !passwordLongEnough(password) ? 'error' : 'primary'
              }>
              Password must be at least 8 characters long {passwordLongEnough(password) ? '✓' : '✘'}
            </Typography>
            <Typography
              variant="caption"
              color={
                !password.length
                  ? 'secondary'
                  : !passwordHasMixedCase(password)
                    ? 'error'
                    : 'primary'
              }>
              at least one uppercase and lowercase letter{' '}
              {passwordHasMixedCase(password) ? '✓' : '✘'}
            </Typography>
            <Typography
              variant="caption"
              color={
                !password.length ? 'secondary' : !passwordHasNumber(password) ? 'error' : 'primary'
              }>
              at least one number {passwordHasNumber(password) ? '✓' : '✘'}
            </Typography>
            <Typography
              variant="caption"
              color={
                !password.length
                  ? 'secondary'
                  : !passwordHasSpecialCharacter(password)
                    ? 'error'
                    : 'primary'
              }>
              at least one special character {passwordHasSpecialCharacter(password) ? '✓' : '✘'}
            </Typography>
            <div className="mt-9">
              <PrimaryButton
                variant={isEmailValid && isPasswordValid ? 'primary' : 'secondary'}
                type="submit"
                disabled={!isEmailValid || !isPasswordValid}
                onClick={submit}
                onSubmit={submit}>
                <span>Sing Up</span>
              </PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div id="form_footer" className="mx-16 mb-12 mt-6"></div>
      </AppContainer>
    </>
  );
}

export default App;

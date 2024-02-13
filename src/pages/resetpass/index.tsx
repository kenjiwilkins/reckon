import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContainer } from '@/components/appContainer';
import { TextInput } from '@/components/textInput';
import { Typography } from '@/components/typography';
import { InputLabel } from '@/components/inputLabel';
import { PrimaryButton } from '@/components/primaryButton';
import { Divider } from '@/components/divider';
import { confirmPassword } from '@/utils/signup';
import {
  passwordLongEnough,
  passwordHasNumber,
  passwordHasMixedCase,
  passwordHasSpecialCharacter,
  validatePasswordOnSignup
} from '@/utils/validator';

function App() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);
  const DIGITS = 6;
  function validateCode(code: string) {
    return code.length === DIGITS;
  }
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    const email = router.query.email as string;
    if (isCodeValid && isPasswordValid && email) {
      confirmPassword(email, code, password)
        .then((res) => {
          router.push({
            pathname: '/success',
            query: {
              ...router.query
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
        <title>Reset Password</title>
      </Head>
      <AppContainer>
        <form>
          <fieldset className="px-16">
            <div className="flex flex-col items-center justify-center pb-5">
              <Typography variant="heading2">Reset Password</Typography>
            </div>
            <InputLabel
              variant={codeFocused ? 'focus' : !isCodeValid && code.length ? 'error' : 'default'}>
              Verification Code
            </InputLabel>
            <TextInput
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setIsCodeValid(validateCode(event.target.value));
              }}
              onFocus={() => setCodeFocused(true)}
              onBlur={() => setCodeFocused(false)}
            />
            <Divider
              variant={codeFocused ? 'focus' : !isCodeValid && code.length ? 'error' : 'default'}
            />
            <InputLabel
              variant={
                passwordFocused
                  ? 'focus'
                  : !isPasswordValid && password.length
                    ? 'error'
                    : 'default'
              }>
              Email Address
            </InputLabel>
            <TextInput
              type="password"
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
                variant={isCodeValid && isPasswordValid ? 'primary' : 'secondary'}
                disabled={!isCodeValid || !isPasswordValid}
                onClick={submit}
                onSubmit={submit}>
                Reset Password
              </PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div className="mx-16 mb-12 mt-6" />
      </AppContainer>
    </>
  );
}

export default App;

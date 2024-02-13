import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContainer } from '@/components/appContainer';
import { TextInput } from '@/components/textInput';
import { Typography } from '@/components/typography';
import { InputLabel } from '@/components/inputLabel';
import { PrimaryButton } from '@/components/primaryButton';
import { Divider } from '@/components/divider';
import { forgotPassword } from '@/utils/signup';
import { validateEmail } from '@/utils/validator';

function App() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await forgotPassword(email);
      if (result) {
        router.push({
          pathname: '/resetpass',
          query: {
            ...router.query,
            email: email
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <AppContainer>
        <form>
          <fieldset className="px-16">
            <div className="flex flex-col items-center justify-center pb-5">
              <Typography variant="heading2">Forgot your password?</Typography>
            </div>
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
              onChange={(event) => {
                setEmail(event.target.value);
                setIsEmailValid(validateEmail(event.target.value));
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            <Divider
              variant={emailFocused ? 'focus' : !isEmailValid && email.length ? 'error' : 'default'}
            />
            <PrimaryButton
              variant={email.length && isEmailValid ? 'primary' : 'secondary'}
              disabled={!email.length || !isEmailValid}
              onClick={submit}
              onSubmit={submit}>
              Request a reset link
            </PrimaryButton>
          </fieldset>
        </form>
        <div className="mx-16 mb-12 mt-6" />
      </AppContainer>
    </>
  );
}

export default App;

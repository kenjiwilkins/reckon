import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import AppContainer from '@/components/appContainer';
import AppImage from '@/components/appImage';
import TextInput from '@/components/textInput';
import { resetPassword } from '@/utils/signup';

function App() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await resetPassword(email);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <AppContainer>
        <div id="form_container" className="px-auto flex w-500px">
          <div id="form" className="w-500px grow shadow-lg">
            <AppImage />
            <form>
              <fieldset className="px-16">
                <h1>Forgot your password</h1>
                <p>Please enter your email address to receive a reset password message</p>
                <label htmlFor="email">Email Address</label>
                <TextInput
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(input: string) => setEmail(input)}
                />
                <button onClick={submit} onSubmit={submit}>
                  Request reset link
                </button>
              </fieldset>
            </form>
            <div className="mx-16 mb-12 mt-6" />
          </div>
        </div>
      </AppContainer>
    </>
  );
}

export default App;

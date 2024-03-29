import Head from 'next/head';
import { FormEvent, createRef, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContainer } from '@/components/appContainer';
import { PrimaryButton } from '@/components/primaryButton';
import { confirm, resendVerification } from '@/utils/signup';

function App() {
  const router = useRouter();
  const email = router.query.email as string;
  const DIGITS = 6;
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [everEdited, setEverEdited] = useState(false);
  const [inputRefsArray] = useState(() =>
    Array.from({ length: DIGITS }, () => createRef<HTMLInputElement>())
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState(Array.from({ length: DIGITS }, () => ''));
  const code = useRef('');
  const handleKeyDown = async (value: string) => {
    if (!value) return;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex < DIGITS - 1 ? prevIndex + 1 : prevIndex;
      const nextInput = inputRefsArray[nextIndex].current;
      nextInput?.focus();

      // blur the input when it's filled
      if (prevIndex === DIGITS - 1) {
        nextInput?.blur();
        if (!submitted && !everEdited) {
          submit();
        }
      }
      return nextIndex;
    });
  };
  function submit(event?: FormEvent) {
    event && event.preventDefault();
    setSubmitted(true);
    confirm(email, code.current)
      .then((res) => {
        window.location.href = encodeURI(`${process.env.NEXT_PUBLIC_BASE_URL}/success`);
        router.push({
          pathname: '/success',
          query: {
            ...router.query
          }
        });
      })
      .catch((err) => {
        setSubmitted(false);
        setHasError(true);
        setErrMessage(err.message);
      });
  }
  function resend() {
    resendVerification(email);
    setHasError(true);
    setErrMessage('Verification email sent');
  }
  return (
    <>
      <Head>
        <title>Verify</title>
      </Head>
      <AppContainer>
        <div id="form_header" className="text-center">
          <h1 className="text-2xl">Verify</h1>
          <h2>Please fill in 6 digits code</h2>
        </div>
        <form>
          <fieldset className="px-16">
            <div className="mt-5 flex justify-center gap-2">
              {inputRefsArray.map((inputRef, index) => {
                return (
                  <input
                    className="h-16 w-10 rounded-lg border border-gray-400 text-center text-3xl"
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    autoFocus={!letters[0].length && !index}
                    key={index}
                    value={letters[index]}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value.length <= 0) setEverEdited(true);
                      const nextLetters = letters.map((letter, i) =>
                        i === index ? value[value.length - 1] || '' : letter
                      );
                      setLetters(nextLetters);
                      code.current = nextLetters.join('');
                      handleKeyDown(value);
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-6 flex flex-col text-center">
              <div id="error" className="mb-2 h-6">
                {hasError && <span className="text-red-600">{errMessage || 'Invalid code'}</span>}
              </div>
              <PrimaryButton
                variant={!submitted && letters.join('').length === DIGITS ? 'primary' : 'secondary'}
                type="submit"
                onClick={submit}
                disabled={submitted || letters.join('').length !== DIGITS}>
                <span>{submitted ? 'Verifying...' : 'Verify'}</span>
              </PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div id="form_footer" className="mx-16 mb-12 mt-6 text-center">
          {email && (
            <button className="bg-white text-sm font-light text-blue-400" onClick={resend}>
              <span>Resend verification email?</span>
            </button>
          )}
        </div>
      </AppContainer>
    </>
  );
}

export default App;

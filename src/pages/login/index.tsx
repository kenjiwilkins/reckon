import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import AppImage from "@/components/appImage";
import { authenticate } from "@/utils/signup";
import { validateEmail, validatePasswordOnLogin } from "@/utils/validator";

function App() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  async function login(event: FormEvent) {
    event.preventDefault();
    try {
      await authenticate(email, password);
      const redirectUrl =
        router.query.redirectUrl ||
        process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL ||
        "/";
      router.push(redirectUrl as string);
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Invalid email or password");
    }
  }

  return (
    <>
      <div
        id="container"
        className="w-screen h-screen flex justify-center items-center"
      >
        <div id="form_container" className="flex px-auto w-500px">
          <div id="form" className="grow shadow-lg w-500px">
            <AppImage />
            <form onSubmit={login}>
              <fieldset className="px-16">
                <label
                  className={`${
                    emailFocused
                      ? "text-blue-600"
                      : !isEmailValid && email.length
                      ? "text-red-600"
                      : "text-gray-400"
                  } text-sm flex justify-start`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="appearance-none w-full h-5 box-border border-none text-base"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(validateEmail(e.target.value));
                  }}
                />
                <div
                  className={`${
                    emailFocused
                      ? "bg-blue-600"
                      : !isEmailValid && email.length
                      ? "bg-red-600"
                      : "bg-gray-400"
                  } h-1px my-2`}
                ></div>
                <label
                  className={`${
                    passwordFocused
                      ? "text-blue-600"
                      : !isPasswordValid && password.length
                      ? "text-red-600"
                      : "text-gray-400"
                  } text-sm flex justify-start`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="appearance-none w-full h-5 box-border border-none text-base"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsPasswordValid(validatePasswordOnLogin(e.target.value));
                  }}
                />
                <div
                  id="divider"
                  className={`${
                    passwordFocused
                      ? "bg-blue-600"
                      : password.length
                      ? "bg-red-600"
                      : "bg-gray-400"
                  } h-1px my-2`}
                ></div>
                <div className="mt-9">
                  <button
                    className={`${
                      isEmailValid ? "bg-blue-600" : "bg-gray-200"
                    } text-white w-full font-bold h-14 rounded`}
                    type="submit"
                    disabled={!email.length || !password.length}
                    onClick={login}
                    onSubmit={login}
                  >
                    <span>Login</span>
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="text-red-600">{errorMessage}</span>
                </div>
              </fieldset>
            </form>
            <div id="form_footer" className="mx-16 mt-6 mb-12 text-center">
              <button className="bg-white text-sm font-light text-blue-400">
                <span>forgot your email or password?</span>
              </button>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-4 h-4 w-full flex justify-start">
          <span>@2023 by Kenji Wilkins.</span>
        </footer>
      </div>
    </>
  );
}

export default App;

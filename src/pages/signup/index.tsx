import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import AppImage from "@/components/appImage";
import { singup } from "@/utils/signup";
import {
  validateEmail,
  passwordLongEnough,
  passwordHasNumber,
  passwordHasMixedCase,
  passwordHasSpecialCharacter,
  validatePasswordOnSignup,
} from "@/utils/validator";

function App() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      singup(email, password)
        .then((res) => {
          router.push({
            pathname: "/verify",
            query: {
              ...router.query,
              email: email,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
            <form action="">
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
                  autoFocus
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
                    setIsPasswordValid(
                      validatePasswordOnSignup(e.target.value)
                    );
                  }}
                />
                <div
                  id="divider"
                  className={`${
                    passwordFocused
                      ? "bg-blue-600"
                      : !isPasswordValid && password.length
                      ? "bg-red-600"
                      : "bg-gray-400"
                  } h-1px my-2`}
                ></div>
                <p className="flex flex-col items-start text-sm">
                  <span
                    className={`${
                      !password.length
                        ? "text-gray-400"
                        : !passwordLongEnough(password)
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    Password must be at least 8 characters long{" "}
                    {passwordLongEnough(password) ? "✓" : "✘"} <br />
                  </span>
                  <span
                    className={`${
                      !password.length
                        ? "text-gray-400"
                        : !passwordHasMixedCase(password)
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    at least one uppercase and lowercase letter{" "}
                    {passwordHasMixedCase(password) ? "✓" : "✘"}
                    <br />
                  </span>
                  <span
                    className={`${
                      !password.length
                        ? "text-gray-400"
                        : !passwordHasNumber(password)
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    at least one number{" "}
                    {passwordHasNumber(password) ? "✓" : "✘"} <br />
                  </span>
                  <span
                    className={`${
                      !password.length
                        ? "text-gray-400"
                        : !passwordHasSpecialCharacter(password)
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    at least one special character{" "}
                    {passwordHasSpecialCharacter(password) ? "✓" : "✘"} <br />
                  </span>
                </p>
                <div className="mt-9">
                  <button
                    className={`${
                      isEmailValid && isPasswordValid
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    } text-white w-full font-bold h-14 rounded`}
                    type="submit"
                    disabled={!isEmailValid || !isPasswordValid}
                    onClick={submit}
                    onSubmit={submit}
                  >
                    <span>Sing Up</span>
                  </button>
                </div>
              </fieldset>
            </form>
            <div id="form_footer" className="mx-16 mt-6 mb-12">
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

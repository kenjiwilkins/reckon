import AppContainer from '@/components/appContainer';
import AppImage from '@/components/appImage';
import { useRouter } from 'next/router';

function App() {
  const router = useRouter();
  function login() {
    router.push({
      pathname: '/login',
      query: {
        ...router.query
      }
    });
  }
  return (
    <>
      <AppContainer>
        <div id="form_container" className="px-auto flex w-500px">
          <div id="form" className="w-500px grow shadow-lg">
            <AppImage />
            <div className="mb-4 flex justify-center">
              <svg
                width="200px"
                height="200px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    fill="#2564eb"
                    fillRule="evenodd"
                    d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
                  />{' '}
                </g>
              </svg>
            </div>
            <div id="form_header" className="text-center">
              <h1 className="text-2xl">Successful</h1>
              <h2>You are now verified</h2>
            </div>
            <div className="mt-4 flex justify-center px-16">
              <button
                className="h-14 w-full rounded bg-blue-600 font-bold text-white"
                onClick={login}
              >
                Login
              </button>
            </div>
            <div id="form_footer" className="mx-16 mb-12 mt-6 text-center"></div>
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

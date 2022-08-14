import "../styles/globals.css";

import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
// const data = store();
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      </Head> */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/* <Component {...pageProps} /> */}

      {/* <Provider store={data.store}>
        <Component {...pageProps} />
      </Provider> */}
    </>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp;

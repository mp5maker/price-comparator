import "../styles/globals.css";
import { Layout } from "../components/layout";
import { ChartContextProvider } from '../contexts/ChartContext'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChartContextProvider>
  );
}

export default MyApp;

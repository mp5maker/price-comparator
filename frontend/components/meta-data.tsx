import Head from "next/head";

interface MetaDataPropsInterface {
  title?: string
}

export const MetaData: React.FC<MetaDataPropsInterface> = ({ title }) => {
  return (
    <Head>
      <title>Price Comparator | {title}</title>
      <meta name="keywords" content="prices" />
    </Head>
  );
};

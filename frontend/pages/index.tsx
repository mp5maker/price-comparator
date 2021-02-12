import apiHelper from "../api/apiHelper";
import styles from "../styles/pages/index.module.css";
import { AxiosError, AxiosResponse } from "axios";
import get from "lodash/get";
import { Table } from "../components/table";
import { MetaData } from "../components/meta-data";

export const getStaticProps = async () => {
  const response = await apiHelper.product.getAll();
  const products = get(response, "data", []);

  return {
    props: {
      products,
    },
  };
};

interface IndexPropsInterface {
  products: Array<any>;
}

const IndexPage: React.FC<IndexPropsInterface> = ({ products }) => {
  const callApi = () => {
    apiHelper.product
      .getAll()
      .then((response: AxiosResponse) => console.log(response))
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  };

  return (
    <div className={styles.indexContainer}>
      <MetaData title={'Compare Prices'} />
      <Table
        list={products}
        display={{
          thead: ({ property }) => {
            return property.toUpperCase()
          },
          tbody: ({ property, row }) => {
            if (property == "distributor")
              return get(row, "distributor.name", "");
            if (property == "type") return get(row, "type.type", "");
            if (property == "photos")
              return (
                <div>
                  {get(row, property, []).map((item: any, index: number) => {
                    return (
                      <img
                        src={`http://localhost:4000/${get(item, "filename", "")}`}
                        width={100}
                        height={100}
                        key={index}
                      />
                    );
                  })}
                </div>
              );
            return get(row, property, "");
          },
        }}
        properties={["name", "model", "distributor", "type", "price", "photos"]}
      />
    </div>
  );
};

export default IndexPage;

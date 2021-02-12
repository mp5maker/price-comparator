import apiHelper from "../api/apiHelper";
import styles from "../styles/pages/index.module.css";
import { AxiosError, AxiosResponse } from "axios";
import get from "lodash/get";
import { Table } from "../components/table";
import { MetaData } from "../components/meta-data";
import { CommonFilter } from "../filters/common";
import { useState } from "react";

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

const IndexPage: React.FC<IndexPropsInterface> = ({
  products: serverProducts,
}) => {
  const [products, setProducts] = useState<Array<any>>(serverProducts);

  const callApi = ({ params }: any) => {
    apiHelper.product
      .getAll({ params })
      .then((response: AxiosResponse) => {
        const data = get(response, "data", []);
        setProducts(data);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  };

  const handleFilter = ({ form }: any) => {
    const price = get(form, "price", 0);
    const type = get(form, "type", "");
    const distributor = get(form, "distributor", "");

    const params = {
      ...(price ? { price } : {}),
      ...(type ? { type } : {}),
      ...(distributor ? { distributor } : {}),
    };
    callApi({ params });
  };

  return (
    <div className={styles.indexContainer}>
      <MetaData title={"Compare Prices"} />
      <CommonFilter onChange={handleFilter} />
      <Table
        list={products}
        display={{
          thead: ({ property }) => {
            return property.toUpperCase();
          },
          tbody: ({ property, row }) => {
            if (property == "distributors" || property == "types") {
              return (
                <div>
                  {get(row, property, []).map((item: any, index: number) => {
                    return <div key={index}>{get(item, "name", "")}</div>;
                  })}
                </div>
              );
            }
            if (property == "photos")
              return (
                <div>
                  {get(row, property, []).map((item: any, index: number) => {
                    return (
                      <img
                        src={`http://localhost:4000/images/${get(
                          item,
                          "filename",
                          ""
                        )}`}
                        width={"auto"}
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
        properties={[
          "name",
          "model",
          "distributors",
          "types",
          "price",
          "photos",
        ]}
      />
    </div>
  );
};

export default IndexPage;

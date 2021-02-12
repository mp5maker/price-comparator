import apiHelper from "../api/apiHelper";
import styles from "../styles/pages/index.module.css";
import { AxiosError, AxiosResponse } from "axios";
import get from "lodash/get";
import { Table } from "../components/table";
import { MetaData } from "../components/meta-data";
import { CommonFilter } from "../filters/common";
import { useState } from "react";
import { Button } from "../components/button";
import { Modal } from "../components/modal";

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
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [_imageURL, setImageURL] = useState<string>("");

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
      <Modal
        show={showImageModal}
        title={"Image Preview"}
        onClose={() => setShowImageModal(false)}
      >
        <div>
          <img src={_imageURL} width={"auto"} height={"100%"} />
        </div>
      </Modal>
      <CommonFilter onChange={handleFilter} />
      <Table
        noDataContent={
          <tbody className={styles.noDataFound}>
            <tr>
              <td>Sorry, No Data Found</td>
            </tr>
          </tbody>
        }
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
                    const imageURL = `http://localhost:4000/images/${get(
                      item,
                      "filename",
                      ""
                    )}`;

                    return (
                      <Button
                        key={index}
                        style={{
                          backgroundColor: "transparent",
                          width: "100%",
                          justifyContent: "flex-start",
                        }}
                        onClick={() => {
                          setImageURL(imageURL);
                          setShowImageModal(true);
                        }}
                      >
                        <img src={imageURL} width={"auto"} height={100} />
                      </Button>
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

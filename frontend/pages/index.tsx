import apiHelper from "../api/apiHelper";
import styles from "../styles/pages/index.module.css";
import { AxiosError, AxiosResponse } from "axios";
import get from "lodash/get";
import { Table } from "../components/table";
import { MetaData } from "../components/meta-data";
import { CommonFilter } from "../filters/common";
import { useState, useEffect, Fragment } from "react";
import { Button } from "../components/button";
import { Modal } from "../components/modal";
import { useChart } from "../hooks/useChart";
import { BarChart } from "../components/bar-chart";
import { VictoryAxis } from "victory";
import { PieChart } from "../components/pie-chart";

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
  const { show: showChart, setShow: setShowChart }: any = useChart();
  const [products, setProducts] = useState<Array<any>>(serverProducts);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [_imageURL, setImageURL] = useState<string>("");
  const [report, setReport] = useState<any>({
    distributorTypesBar: [],
    typeDistributorsBar: [],
    distributorTypesPie: [],
    typeDistributorsPie: [],
  });

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

  useEffect(() => {
    const onSuccess = ([
      distributorTypesBarResponse,
      distributorTypesPieResponse,
      typeDistributorsBarResponse,
      typeDistributorsPieResponse,
    ]: AxiosResponse[]) => {
      const distributorTypesBar = get(distributorTypesBarResponse, "data", []);
      const distributorTypesPie = get(distributorTypesPieResponse, "data", []);
      const typeDistributorsBar = get(typeDistributorsBarResponse, "data", []);
      const typeDistributorsPie = get(typeDistributorsPieResponse, "data", []);

      const prepareDistributorTypesBar = distributorTypesBar.reduce(
        (newArray: Array<any>, item: any) => {
          return [
            ...newArray,
            {
              label: get(item, "distributor_name", ""),
              data: [
                {
                  name: "television",
                  total: get(item, "television", 0),
                  color: "#6200ee",
                },
                {
                  name: "washingMachine",
                  total: get(item, "washingMachine", 0),
                  color: "#3700b3",
                },
                {
                  name: "fridge",
                  total: get(item, "fridge", 0),
                  color: "#2a8786",
                },
                {
                  name: "airConditioner",
                  total: get(item, "airConditioner", 0),
                  color: "#000000",
                },
              ],
            },
          ];
        },
        []
      );

      const prepareTypesDistributorBar = typeDistributorsBar.reduce(
        (newArray: Array<any>, item: any) => {
          return [
            ...newArray,
            {
              label: get(item, "type_name", ""),
              data: [
                {
                  name: "elektra",
                  total: get(item, "elektra", 0),
                  color: "#6200ee",
                },
                {
                  name: "transcom",
                  total: get(item, "transcom", 0),
                  color: "#3700b3",
                },
                {
                  name: "esquire",
                  total: get(item, "esquire", 0),
                  color: "#48dac6",
                },
                {
                  name: "butterfly",
                  total: get(item, "butterfly", 0),
                  color: "#2a8786",
                },
                {
                  name: "mkElectronics",
                  total: get(item, "mkElectronics", 0),
                  color: "#b00020",
                },
                {
                  name: "rangsElectronics",
                  total: get(item, "rangsElectronics", 0),
                  color: "#000000",
                },
                {
                  name: "bestElectronics",
                  total: get(item, "bestElectronics", 0),
                  color: "#dbb2ff",
                },
              ],
            },
          ];
        },
        []
      );

      setReport({
        distributorTypesBar: prepareDistributorTypesBar,
        distributorTypesPie,
        typeDistributorsBar: prepareTypesDistributorBar,
        typeDistributorsPie,
      });
    };

    const requests = [
      apiHelper.report.getDistributorTypesBar(),
      apiHelper.report.getDistributorTypesPie(),
      apiHelper.report.getTypeDistributorsBar(),
      apiHelper.report.getTypeDistributorsPie(),
    ];

    const onError = (_error: AxiosError) => console.debug(_error.response);

    Promise.all(requests).then(onSuccess).catch(onError);
  }, []);

  const distributorTypesBar = get(report, "distributorTypesBar", []);
  const typeDistributorsBar = get(report, "typeDistributorsBar", []);
  const distributorTypesPie = get(report, "distributorTypesPie", []);
  const typeDistributorsPie = get(report, "typeDistributorsPie", []);
  console.log(
    "🚀 ~ file: index.tsx ~ line 189 ~ typeDistributorsPie",
    typeDistributorsPie
  );

  const distributorTypesBarContent = (
    <div className={styles.distributorTypes}>
      <div>
        <h2>Distributor Types</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {distributorTypesBar.map((item: any, index: number) => {
          const label = get(item, "label", "");
          const data = get(item, "data", "");
          return (
            <Fragment key={String(label) + String(index)}>
              <div
                style={{
                  marginBottom: "var(--small)",
                  boxShadow: "0 1px 15px 0 var(--boxShadow)",
                }}
              >
                <figure>
                  <figcaption>
                    <h3>{label}</h3>
                  </figcaption>
                  <BarChart
                    data={data}
                    x={"name"}
                    y={"total"}
                    style={{
                      data: {
                        fill: ({ datum }) => datum.color,
                      },
                    }}
                  >
                    <VictoryAxis
                      style={{
                        grid: { stroke: "none" },
                      }}
                      tickValues={[1, 2, 3, 4]}
                      tickFormat={["T.V", "W.M", "Fridge", "A.C"]}
                    />
                  </BarChart>
                </figure>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );

  const typeDistributorsBarContent = (
    <div className={styles.typeDistributors}>
      <div>
        <h2>Types of distributor</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {typeDistributorsBar.map((item: any, index: number) => {
          const label = get(item, "label", "");
          const data = get(item, "data", "");
          return (
            <Fragment key={String(label) + String(index)}>
              <div
                style={{
                  height: 350,
                  marginBottom: "var(--small)",
                  boxShadow: "0 1px 15px 0 var(--boxShadow)",
                }}
              >
                <figure>
                  <figcaption>
                    <h3>{label}</h3>
                  </figcaption>
                  <BarChart
                    style={{
                      data: {
                        fill: ({ datum }) => datum.color,
                      },
                    }}
                    chartProps={{
                      padding: {
                        left: 60,
                      },
                    }}
                    horizontal={true}
                    width={350}
                    data={data}
                    x={"name"}
                    y={"total"}
                  >
                    <VictoryAxis
                      style={{
                        grid: { stroke: "none" },
                      }}
                      tickValues={[1, 2, 3, 4]}
                      tickFormat={[
                        "Elektra",
                        "Transcom",
                        "esquire",
                        "butterfly",
                        "MKE",
                        "Rangs",
                        "Best El.",
                      ]}
                    />
                  </BarChart>
                </figure>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );

  const distributorTypesPieContent = (
    <div className={styles.typeDistributors}>
      <div>
        <h2>How many product types are sold by each distributors? </h2>
      </div>
      <div
        style={{
          height: 400,
          width: 400,
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "var(--small)",
          boxShadow: "0 1px 15px 0 var(--boxShadow)",
        }}
      >
        <PieChart
          colorScale={"qualitative"}
          horizontal={true}
          labels={({ datum }) =>
            `${datum.distributorName}: ${datum.totalTypes}`
          }
          data={distributorTypesPie}
          x={"distributorName"}
          y={"totalTypes"}
        >
          <VictoryAxis
            tickFormat={() => ""}
            style={{
              axis: { stroke: "none" },
              ticks: { stroke: "none" },
              tickLabels: { fill: "none" },
              grid: { stroke: "none" },
            }}
          />
        </PieChart>
      </div>
    </div>
  );

  const typeDistributorsPieContent = (
    <div className={styles.typeDistributors}>
      <div>
        <h2>How many distributors are selling each product types? </h2>
      </div>
      <div
        style={{
          height: 400,
          width: 400,
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "var(--small)",
          boxShadow: "0 1px 15px 0 var(--boxShadow)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChart
            chartProps={{
              style: {
                parent: {
                  margin: 50,
                },
              },
            }}
            colorScale={"qualitative"}
            horizontal={true}
            labels={({ datum }) =>
              `${datum.typeName.substring(0, 9)}: ${datum.totalDistributors}`
            }
            width={200}
            data={typeDistributorsPie}
            x={"typeName"}
            y={"totalDistributors"}
          >
            <VictoryAxis
              tickFormat={() => ""}
              style={{
                axis: { stroke: "none" },
                ticks: { stroke: "none" },
                tickLabels: { fill: "none" },
                grid: { stroke: "none" },
              }}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );

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
      <Modal
        show={showChart}
        title={"Analysis"}
        onClose={() => setShowChart(false)}
      >
        <div
          style={{
            padding: "0 var(--small)",
          }}
        >
          {distributorTypesBarContent}
          {typeDistributorsBarContent}
          {distributorTypesPieContent}
          {typeDistributorsPieContent}
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

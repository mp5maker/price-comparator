import { AxiosError } from "axios";
import get from "lodash/get";
import { useEffect, useState } from "react";
import apiHelper from "../api/apiHelper";
import { Select } from "../components/select";
import { Button } from "../components/button";
import styles from "../styles/filters/common.module.css";

interface CommonFilterPropsInterface {}

const defaultState = {
  price: "",
  type: "",
  distributor: "",
};

export const CommonFilter: React.FC<CommonFilterPropsInterface> = ({
  onChange,
}): JSX.Element => {
  const [distributors, setDistributors] = useState<Array<any>>([]);
  const [types, setTypes] = useState<Array<any>>([]);

  const [form, setForm] = useState<any>(defaultState);

  const hasDistributors =
    Array.isArray(distributors) && distributors.length > 0;
  const hasTypes = Array.isArray(types) && types.length > 0;

  useEffect(() => {
    const calls = [apiHelper.distributor.getAll(), apiHelper.type.getAll()];

    const onSuccess: any = ([
      distributorResponse,
      typeResponse,
    ]: Array<any>) => {
      const distributorData = get(distributorResponse, "data", []);
      const typeData = get(typeResponse, "data", []);
      setDistributors(distributorData);
      setTypes(typeData);
    };

    const onError = (error: AxiosError) => {
      console.debug(error.response);
    };

    Promise.all(calls).then(onSuccess).catch(onError);
  }, []);

  const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = get(event, "currentTarget.value", "");
    const name = get(event, "currentTarget.name", "");
    setForm({
      ...form,
      [name]: value,
    });
    if (onChange) onChange({ current: { name, value }, form });
  };

  const handleClear = () => {
    setForm(defaultState);
    if (onChange) onChange({ form: defaultState });
  };

  return (
    <>
      <div className={styles.commonFilterContainer}>
        <div className={styles.commonFilterContents}>
          {hasDistributors && hasTypes ? (
            <>
              <div className={styles.commonFilterContent}>
                <div className={styles.commonFilterContentLabel}>
                  <label htmlFor="distributor">Choose a Distributor</label>
                </div>
                <Select
                  customValue={({ item }) => get(item, "id", "")}
                  customDisplay={({ item }) => get(item, "name", "")}
                  list={distributors}
                  value={form.distributor}
                  onChange={handleSelect}
                  name={"distributor"}
                />
              </div>
              <div className={styles.commonFilterContent}>
                <div className={styles.commonFilterContentLabel}>
                  <label htmlFor="type">Choose a Type</label>
                </div>
                <Select
                  customValue={({ item }) => get(item, "id", "")}
                  customDisplay={({ item }) => get(item, "name", "")}
                  list={types}
                  value={form.type}
                  onChange={handleSelect}
                  name={"type"}
                />
              </div>
              <div className={styles.commonFilterContent}>
                <div className={styles.commonFilterContentLabel}>
                  <label htmlFor="price">Choose your maximum price</label>
                </div>
                <Select
                  customValue={({ item }) => item}
                  customDisplay={({ item }) => item}
                  list={[
                    10000,
                    20000,
                    30000,
                    40000,
                    50000,
                    60000,
                    70000,
                    80000,
                    90000,
                    100000,
                    150000,
                    200000,
                  ]}
                  value={form.price}
                  onChange={handleSelect}
                  name={"price"}
                />
              </div>
            </>
          ) : (
            <div>Filters Loading Please Wait ...</div>
          )}
        </div>
        <div>
          <Button onClick={handleClear}>Clear</Button>
        </div>
      </div>
    </>
  );
};

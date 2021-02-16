import axios from "./axios";

export default {
  product: {
    getAll: ({ params = {} }: any = {}) => axios.get("/product/", { params }),
  },
  distributor: {
    getAll: ({ params = {} }: any = {}) => axios.get("/product/distributor/", { params }),
  },
  type: {
    getAll: ({ params = {} }: any = {}) => axios.get("/product/type/", { params }),
  },
  report: {
    getDistributorTypesBar: () => axios.get("/report/distributor-types/bar/"),
    getDistributorTypesPie: () => axios.get("/report/distributor-types/pie/"),
    getTypeDistributorsBar: () => axios.get("/report/type-distributors/bar/"),
    getTypeDistributorsPie: () => axios.get("/report/type-distributors/pie/")
  }
};

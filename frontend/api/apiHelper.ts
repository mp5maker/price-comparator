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
  }
};

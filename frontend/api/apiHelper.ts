import axios from "./axios";

export default {
  product: {
    getAll: ({ params = {} }: any = {}) => axios.get("/product", { params }),
  },
};

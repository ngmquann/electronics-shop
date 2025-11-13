import axiosClient from "../utils/axiosClient";


const productApi = {
  getProductHome: (number) =>
    axiosClient.get("/product/random", {
      params: { number },
    }),
}

export default productApi

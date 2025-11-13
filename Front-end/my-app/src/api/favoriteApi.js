

import axiosClient from "../utils/axiosClient";


const favoriteApi = {
  toggleFavorite: (id) =>
    axiosClient.get("/favorite/toggle", {
      params: { id },
    }),
}

export default favoriteApi

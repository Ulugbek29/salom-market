import request from "../utils/request";


const productsService = {
  getList: ({limit=1000}) => request.get(`/product?limit=${limit}`),
  getById: (id, params) => request.get(`/product/${id}`, { params }),
  create: (data) => request.post("/product", data),
  update: (data) => request.put("/product", data),
  delete: (id) => request.delete(`/product/${id}`),
};

export default productsService;
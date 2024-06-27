import request from "../utils/request";


const orderServices = {
  getList: ({limit=1000, customerId=""}) => request.get(`/order?limit=${limit}&customer_id=${customerId}`),
  getById: (id, params) => request.get(`/order/${id}`, { params }),
  create: (data) => request.post("/order", data),
  update: (data) => request.put("/order", data),
//   delete: (id) => request.delete(`/order/${id}`),
};

export default orderServices;
import request from "../utils/request";


const telegramIdService = {
  getById: (id, params) => request.get(`/customer/by_tg/${id}`, { params }),
};

export default telegramIdService;
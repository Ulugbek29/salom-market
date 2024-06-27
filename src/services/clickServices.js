import clickRequest from "../utils/clickRequest"


const clickServices =  {
    getToken: (data) => clickRequest.post("/request", data),
    verifyToken: (data) => clickRequest.post("/verify", data)
}


export default clickServices
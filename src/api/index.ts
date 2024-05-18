import { Http } from "./request";
const http = new Http("http://localhost:3000");
export const getOssToken = () => {
    return http.get("/getOssSignature")
}
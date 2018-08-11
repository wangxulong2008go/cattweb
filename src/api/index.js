import {basePromise,uploadPromise} from './api.js'
const  loginApi = (url,data,method) => basePromise(url,data,method);
const fileUploadApi = (url,data) => uploadPromise(url,data);
export{
  loginApi,
  fileUploadApi
}
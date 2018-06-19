import {basePromise,uploadPromise} from './api.js'
const  loginApi = (data,url) => basePromise(data,url);
const fileUploadApi = (data,url) => uploadPromise(data,url);
export{
  loginApi,
  fileUploadApi
}
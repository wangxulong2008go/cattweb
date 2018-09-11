import Axios from 'axios';
import router from '../router'
const  Qs = require('qs');
Axios.interceptors.request.use( config => {
  return config;
}, error => {
  return Promise.reject(error);
});
Axios.interceptors.response.use( response => {
  if(response.data){
    let res = response.data;
    if(res.code === 401){
      //登录失败
        return Promise.reject(res);
    }else{
      return response;
    }
  }
},(error) => {
  return Promise.reject(error);
});
const basePromise = (url,params,method = 'POST') => {
  return new Promise((resolve, reject) => {
    Axios({
      url: url,
      method: method,
      data: method === 'POST' || method === 'PUT' ? params : null,
      transformRequest: [function (data) {
       // let ret = 'data=' + JSON.stringify(data);
        return encodeURI(JSON.stringify(data));
      }],
      params:method === 'GET' || method === 'DELETE' ? params : null,
      paramsSerializer: function(params) {
       //if(params){
        //params.SESSIONID = window.SESSION.sessionId;
       //}
         return Qs.stringify(params)
    },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }).then((res) => {
       if(res.data.rc == 10003){
         //未登录
         //唤起app
          var url = window.rootUrl+'?ae=1&ci=2&ui=-1';
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          // 添加http头，发送信息至服务器时内容编码类型
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
               // console.log(xhr.responseText);
                let dataResult = JSON.parse(xhr.responseText);
                location.href = dataResult.url;
            }
          };
          xhr.send();
       }
      //resolve(res);
      // if((res.data.ret == 10 && res.data.message.indexOf('session') > -1)){
      //   router.push('/errors');
      // }else{
        resolve(res);
     // }
    }).catch(function (error) {
      if(error.response){
         let status = error.response.status;
         if(status >= 500 ){//服务器错误
           //do something...
         //  router.push({path:'/error',query:{type:2}});
         }else if(status >= 400 &&  status < 500 ){ //资源请求错误
           //do something...
         //  router.push({path:'/error',query:{type:1}});
         }

      }else if(error.message.indexOf('timeout')!=-1){
         //do something...
          console.log('timeout');
      }else{
          console.log(error);

      }
    });
  })
};

const uploadPromise = (url,param) => {
  return new Promise((resolve, reject) => {
    Axios({
      url: url,
      method: 'post',
      data: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }).then((res) => {
      resolve(res);

    }).catch(function (error) {
      console.log(error);
    });
  })
};

export{
  basePromise,
  uploadPromise
}

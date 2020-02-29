import config from './config.js'
import Framework7 from 'framework7/framework7.esm.bundle.js';
function post(url,header,data, success, error,complete) {
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "POST",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        crossDomain: true,
        dataType: 'json',
        cache: false,
        timeout:6000,
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        }
    })
}
function get(url,header,data, success, error,complete) {
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "GET",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        crossDomain: true,
        dataType: 'json',
        cache: false,
        timeout:6000,
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        },
    })
}
function getNext(url,header,success,error,complete){
    Framework7.request({
        url: url,
        method: "GET",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        dataType: 'json',
        cache: false,
        timeout:6000,
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        },
    })
}
function put(url,header,data,success,error,complete){
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "PUT",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        data: data,
        dataType: 'json',
        timeout:6000,
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        },
    })
}
function destroy(url,header,data,success,error,complete){
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "DELETE",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        },
    })
}
function postMultipart(url,header,data,success,error,complete){
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "POST",
        headers :header,
        contentType: 'multipart/form-data',
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        },
        complete: function(xhr,status){
            if(complete){
                complete(xhr,status);
            }
        },
    })
}
export default {post,get,getNext,put,destroy,postMultipart};
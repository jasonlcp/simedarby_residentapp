import config from './config.js'
import Framework7 from 'framework7/framework7.esm.bundle.js';
function post(url,header,data, success, error) {
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "POST",
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        crossDomain: true,
        dataType: 'json',
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        }
    })
}
function get(url,header,data, success, error) {
    Framework7.request({
        url: config.BASE_URL + url + '/',
        method: "GET",
        async:false,
        headers :header,
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        crossDomain: true,
        dataType: 'json',
        success: function(data){
            success(data);
        },
        error: function(xhr,status){
            error(xhr,status);
        }
    })
}
export default {post,get};
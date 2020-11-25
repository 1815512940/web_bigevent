var baseAPL = 'http://ajax.frontend.itheima.net'
// 
$.ajaxPrefilter(function  (params) {
    params.url = baseAPL + params.url
})
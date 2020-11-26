var baseAPL = 'http://ajax.frontend.itheima.net'
// 拦截所有Ajax请求
$.ajaxPrefilter(function  (params) {
    params.url = baseAPL + params.url

    // 必须以 /my 开头才行
    if ( params.url.indexOf('/my/') !== -1) {
        params.headers =  {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截所有响应，判断身份认证信息
    params.complete = function (res) {
        if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
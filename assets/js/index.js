$(function () {
    getUserInof()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空本地tokan
            localStorage.removeItem('token')
            // 页面跳转到登录页面
            location.href = '/login.html'
            // 关闭弹出框
            layer.close(index);
          })
    })
})

// 获取用户信息（封装到人口函数的外面）
// 因为后面要用  全局变量
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvater(res.data)
        }
    })
}

function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)

    if (user.user_pic !== null) {
        $('.layui-nav-img').show().prop('src', user.user_pic)
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avater').show().html(text)
    }
}
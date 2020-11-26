$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1 ~ 6 之间'
            }
        }
    })

    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取后，渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        // 阻止重置
        e.preventDefault()
        // 重新渲染
        initUserInfo()

    })

    // 提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('用户信息修改失败!')
                layer.msg('用户信息修改成功!')
                window.parent.getUserInof()
            }
        })
    })
    
})
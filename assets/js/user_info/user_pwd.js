$(function () {
    var form = layui.form
    // 校验密码
    form.verify({
        // 密码 6 ~ 20 位
        pwd: [
            /^[\S]{6,20}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   新旧密码不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '不能与原密码相同!'
            }
        },
        // 两次密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致!'
            }
        }
    })

    // 重置密码
    $('.layui-form').on('submit', function  (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg('修改密码成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})
$(function () {
    // 1.切换
    // (1).点击去注册账号，隐藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // (2).点击去登录，隐藏注册区域，显示登录区域
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        // 密码校验
        pwd: [
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
          ],
          // 确认密码校验规则
          repwd: function (value) {
              // value 为用户输入的值
              // $('.reg-box [name=password]') 后代选择器 
              // [name=password] 属性选择器
              var pwd = $('.reg-box [name=password]').val()
              if (value !== pwd) {
                  return '两次密码输入不一致'
              }
          }
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                // 提交成功后处理代码
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

    // 4 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败!')
                layer.msg('登录成功!')
                $('#form_login')[0].reset()
                // 保存token 到本地
                localStorage.setItem('token', res.token)
                // 跳到后台
                location.href = "/index.html"
            }
        })
    })


})
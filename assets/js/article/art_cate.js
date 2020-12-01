$(function () {
    // 获取文章列表
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var layer = layui.layer
    var form = layui.form

    // 添加类别
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 添加 - 渲染页面
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                initArtCateList()

                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    // 修改类别
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var Id = $(this).attr('data-id')
        //   console.log(id);

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })

        // 重置
        $('#btnReset').on('click', function (e) {
            e.preventDefault()

            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + Id,
                success: function (res) {
                    form.val('form-edit', res.data)
                }
            })
        })
    })
    // 修改 - 渲染页面
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')

        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    initArtCateList()
                    layer.close(index)
                }
            })
        });
    })
})
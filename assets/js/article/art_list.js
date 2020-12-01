$(function () {
    // 过滤器函数
    template.defaults.imports.dateFormat = function (time) {
        var date = new Date(time)

        var y = date.getFullYear()
        var m = padZero(date.getMonth() + 1)
        var d = padZero(date.getDate())

        var hh = padZero(date.getHours())
        var mm = padZero(date.getMinutes())
        var ss = padZero(date.getSeconds())

        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
    }

    // 去零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    var layer = layui.layer
    var laypage = layui.laypage

    // 1.定义提交参数
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, // 每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', // 文章的状态 可选值有：已发布、草稿
    }

    // 2.初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                renderPage(res.total)
            }
        })
    }

    var form = layui.form

    // 3.初始化分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })

    // 5.分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 放分页的容器 这里不需要带前缀
            count: total, // 页码总数
            limit: q.pagesize, // 每页显示多少条数据
            curr: q.pagenum, // 默认选中页面值
            // count 数据总数, limit 每页显示的条数, prev 自定义“上一页”的内容, page 分页区域 next 自定义“下一页”的内容, skip 快捷跳页区域
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // 起始页
                q.pagenum = obj.curr
                // 每页显示的条数。laypage将会借助 count 和 limit 计算出分页数
                q.pagesize = obj.limit

                // 可以通过 first 的值，来判断是通过哪种方式触发的 jump 回调
                // 首次进来 first 的值为true， 就不会触发 initTable()
                // 否则就是点击页码触发的回调 
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')

        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                    layer.close(index)
                }
            })
        });
    })
})
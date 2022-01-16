$(function () {
  getUserInfo()
  //点击退出按钮，实现推退出功能
  $('#btnLogout').on('click', function () {
    // console.log('ok');
    //提示用户是否需要退出
    layer.confirm('是否需要退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // console.log('ok');
      //1.清空本地存储中的token
      localStorage.removeItem('token')
      //2.重新 跳转到登录 页面
      location.href = '/login.html'
      //关闭confirm询问框
      layer.close(index);
    });
  })
})
//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //headers 就是请求头配置对象  localStorage.getItem('token')获取键
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // console.log(res);
      //调用用户头像渲染
      renderAvater(res.data)
    },
    //不论是成功还是失败，最终都会调用complete回调函数
    // complete: function (res) {
    //   // console.log('执行了complete回调');
    //   // console.log(res);
    //   //在complete回调函数中，可以使用res.responseJSON拿到 服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     //1.强制清空token
    //     localStorage.removeItem('token')
    //     //2.强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}
//渲染 用户的头像
function renderAvater(user) {
  //获取用户名称
  var name = user.nickname || user.username
  //设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //3.按照需求渲染用户的头像
  if (user.user_pic !== null) {
    //3.1渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avater').hide()
  } else {
    //3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avater').html(first).show()

  }
}
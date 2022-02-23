// pages/search/index.js
/* 
    1 输入框绑定 值改变事件 input事件
        1 获取到输入框的值
        2 合法性的判断
        3 检验通过 把输入框的值 发送到后台
        4 返回的值打印到页面上
    2 防抖 (防止抖动) 定时器 节流
        0 防抖 一般 输入框中 防止重复输入 重复发送请求
        1 节流 一般用在页面下拉和上拉
        1 定义全局的定时器
*/

import { request } from "../../request/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        // 取消 按钮 是否显示
        isFocus:false,
        inpValue:""
    },
    TimeId: -1,

    //输入框的值改变 就会触发的事件
    handleInput(e){
        // 1 获取输入框的值
        const {value} = e.detail;
        // 2 检测合法性
        if(!value.trim()){
            // 值不合法
            clearTimeout(this.TimeId);
            this.setData({
                goods:[],
                isFocus:false
            });
            return;
        }
        // 3 准备发送请求获取数据
        this.setData({
            isFocus:true
        })
        clearTimeout(this.TimeId);
        this.TimeId=setTimeout(() => {
            this.qsearch(value);
        }, 1000);
    },

    // 发送请求获取搜素建议 数据
    async qsearch(query){
        const res = await request({url:"/goods/qsearch",data:{query}});
        console.log(res);
        this.setData({
            goods: res
        });
    },

    handleCancel(){
        clearTimeout(this.TimeId);
        this.setData({
            inpValue:"",
            isFocus:false,
            goods:[]
        })
    }
})
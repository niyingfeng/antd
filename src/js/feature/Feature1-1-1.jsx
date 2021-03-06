// 纯数据展现情况列表
import React from 'react';
import Reqwest from 'reqwest';

import Config from '../common/config';
import Util from '../common/util';
import CopyClipboard from '../component/CopyClipboard';

import FeatureSetConfig from '../component/FeatureSetConfig';
import testData from '../common/test-data';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const table_conf = {
    
    type: 'tableList', // tableList graphList simpleObject complexObject 

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){
        // 接口调用数据形式
    
        // let data = {
        //     ship: 0,
        //     num: 100
        // }

        // Reqwest({
        //     url: Config.host + '/umis/tools/newslist',
        //     data: data,
        //     type: 'jsonp',
        //     jsonpCallback: 'fn',
        //     success: function (data) {
        //         let lists = data.data.list;
                
        //         // 必须要向数据中 添加唯一的 key
        //         lists.forEach(function(ele) {
        //             ele.key = ele.id;
        //         });

        //         callback(lists);
        //     }
        // });
    
       
       //模拟数据
       setTimeout(function(){
            let list = testData.table2List;
            list.forEach(function(ele) {
                ele.key = ele.id;
            });
            callback(list);
       }, 1000)
    },
        
    // table 列表展现配置
    // {
    //      title       table显示表题
    //      dataIndex   显示数据中的key
    //      type        展现形式 （string image link）
    //      render      自定义展现形式 参数 （当前数据，当前对象数据）
    //      sort        是否需要排序功能
    //      width       自定义该列宽度 否则等分
    // }
    // 
    // table 列表头标题
    columns: [
        {
            title: 'ID',     // table header 文案
            dataIndex: 'id', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            sort: true,         // 是否需要排序
            width: 50
        },{
            title: 'NID',     // table header 文案
            dataIndex: 'nid', // 数据对象内的属性，也做react vdom 的key
            type: 'string',     // table 内显示的类型
            width: 180
        }, {
            title: '新闻标题',
            dataIndex: 'title',
            type: 'string',

        }, {
            title: '原文链接',
            dataIndex: 'url',
            type: 'link',
            render: (text) => ( <span>
                                    <a href={text} target="_blank">{text}</a>
                                </span>),

        },{
            title: '落地页链接',
            render: (text, item) => ( <span><a href={'http://mbrowser.baidu.com/web/rsstopic/landing#/feed/ACT/news_'+item.nid+'/'+encodeURIComponent(item.url)} target="_blank">落地页链接</a></span>),
            width: 80
        },{
            title: '最后修改时间',
            dataIndex: 'update_time',
            type: 'string',
            width: 150
        },{
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            width: 150,
            btns: [{
                // text: '复制链接',
                // callback: function(item){
                //     console.log(item)
                // }
                render: (text, item) => (<CopyClipboard title='复制链接' type='link' data={item.url} />)
            }], 
            
            // 对应btns 的回调函数 
            // item为操作的单一数据对象  
            // callback 为组件的回调函数，将处理之后的数据回传 删除则传undefined
            // callbacks: [function(item, callback){
            //     item.docid = 0;
            //     callback(item, 'update');
            // },function(item, callback){
            //     callback(item, 'delete');
            // }]
        }
    ]

};

const Feature1 = FeatureSetConfig(table_conf);

export default Feature1;

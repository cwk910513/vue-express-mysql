let config = {
    // 左侧导航条数据
    menuItemArray: [
        { type: 'menu', title: '个人中心', url: '/dashboard/info' },
        { type: 'menu', title: '用户管理', url: '' },
        { type: 'sub', title: '图表管理', childItem: [
            { type: 'sub-item', title: '柱状图', url: '' },
            { type: 'sub-item', title: '饼状图', url: '' },
            { type: 'sub-item', title: '折线图', url: '' }
        ] }
    ]
};

export default config;
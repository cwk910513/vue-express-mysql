<style scoped lang='scss'>
    @import '../../../assets/scss/menuItem.scss';
</style>

<template>
    <a-menu theme="dark" :selectedKeys="[defaultSltTypes]" mode="inline">
        <a-menu-item key="user" @click="gotoUrl('user', '用户管理')">
            <a-icon type="desktop"/>
            <span>用户管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
            <span slot="title">
                <a-icon type="user" />
                <span>图表管理</span>
            </span>
            <a-menu-item key="3">柱状图</a-menu-item>
            <a-menu-item key="4">饼状图</a-menu-item>
            <a-menu-item key="5">折线图</a-menu-item>
        </a-sub-menu>
        
    </a-menu>
</template>

<script>
export default {
    data() {
        return {
            defaultSltTypes: '',
        }
    },
    beforeMount() {
        let self = this;
        self.crtItem = JSON.parse(sessionStorage.getItem('crtItem'));
        if(self.crtItem) {
            self.$set(self, 'defaultSltTypes', self.crtItem.type);
            self.$router.push({ path: self.crtItem.path });
        } else {
            self.gotoUrl('home', '首页');
        }
    },
    mounted() {
        
    },
    methods: {
        gotoUrl(type, title) {
            let self = this;
            self.path = type === 'home' ? '/dashboard/' : '/dashboard/'+ type; 
            // 设置menu-item选中项
            self.crtItem = { 'path': self.path, 'type': type };
            sessionStorage.setItem('crtItem', JSON.stringify(self.crtItem));
            // 设置tab数组
            self.getSessionItemList = JSON.parse(sessionStorage.getItem('tabListArray'));
            self.currentItemInfo = { 'type': type, 'title': title, 'active': true, 'path': self.path };
            if(!self.getSessionItemList) {
                sessionStorage.setItem('tabListArray', JSON.stringify( [self.currentItemInfo] ));
            } else {
                self.filterItem = self.getSessionItemList.filter( (item) => { if(item.type == type) { return item } });
                if(self.filterItem.length) {
                    self.getSessionItemList.map( item => {
                        item.active = item.type === type;
                    })
                    sessionStorage.setItem('tabListArray', JSON.stringify(self.getSessionItemList));
                } else {
                    sessionStorage.setItem('tabListArray', JSON.stringify([...self.getSessionItemList, self.currentItemInfo]));
                }
            }
            
            // 切换menu
            self.$set(self, 'defaultSltTypes', type);
            // 路由跳转
            self.$router.push({ path: self.path });
            // 调用组件声明的方法
            self.$emit('changeAcitveTab', type);
        },
        // 供父组件切换tab时设置active-menu
        setAcitveMenu(type) {
            let self = this;
            self.$set(self, 'defaultSltTypes', type);
            sessionStorage.setItem('crtItem', JSON.stringify({ 'path': self.path, 'type': type }));
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../../assets/scss/menuItem.scss';
</style>

<template>
    <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
            <a-icon type="user" />
            <span>个人中心</span>
        </a-menu-item>
        <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>用户管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
            <span slot="title">
                <a-icon type="user" />
                <span>表格管理</span>
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
            
        }
    },
}
</script>
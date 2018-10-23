<style scoped lang='scss'>
    @import '../../assets/scss/dashboard.scss';
</style>

<template>
    <a-layout class="dashboard-content">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <div class="logo">{{ collapsed ? 'EVM' : 'Express Vue Mysql' }}</div>
            <menu-item-component></menu-item-component>
        </a-layout-sider>
        <a-layout>
            <layout-header-component v-on:headerCollapsed="getHeaderCollapsed"></layout-header-component>
            <a-layout-content class="layout-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import menuItemComponent from '@/components/layout/content/menuItem.vue';
import layoutHeaderComponent from '@/components/layout/content/layoutHeader.vue';


export default {
    components: {
        menuItemComponent,
        layoutHeaderComponent
    },
    data() {
        return {
            collapsed: false,
        }
    },
    methods: {
        getHeaderCollapsed(collapsed) {
            let self = this;
            self.collapsed = collapsed;
        }
    }
}
</script>
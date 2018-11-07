<style scoped lang='scss'>
    @import '../assets/scss/user.scss';
</style>

<!-- <a-table>外面不能包裹div标签，否则程序加载不出来。。。 -->
<template>
    <a-table :columns="columns" :dataSource="userData" />
</template>

<script>
    import ActionUrl from '../assets/js/action.url.js';
    import http from '../assets/js/http.js';

    export default {
        data () {
            return {
                userData: [],
                columns: [
                    {
                        title: '用户名',
                        dataIndex: 'username',
                        key: 'username',
                    },
                    {
                        title: '联系电话',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: '邮箱',
                        dataIndex: 'email',
                        key: 'email',
                    }
                ]
            }
        },
        mounted() {
            let self = this;
            self.getUsers();
        },
        methods: {
            async getUsers() {
                let self  = this;
                const { data } = await http.get(ActionUrl.user.get.url);
                console.log(data);
                if(data.status === 'success') {
                    self.$set(self, 'userData', data.data);
                } else {
                    self.$message.warning(data.message);
                }
            }
        }
    }
</script>

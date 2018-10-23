<!-- 添加scoped，用于设置样式文件只在当前组件中生效 -->
<style scoped lang='scss'>
    @import '../../assets/scss/login.scss';
</style>

<template>
    <div class="login-content">
        <div class="text-info">Express Vue Mysql</div>
        <br/>
        <a-row>
            <a-col :xs="3" :sm="6" :md="8" :lg="8" :xl="9" :xxl="10"></a-col>
            <a-col :xs="18" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4">
                <a-input placeholder='请输入用户名...' v-model='user'>
                    <a-icon slot='prefix' type='user' style='color:rgba(0,0,0,.25)'/>
                </a-input>
                <br />
                <br />
                <a-input type='password' placeholder='请输入密码...' v-model='pwd'>
                    <a-icon slot='prefix' type='lock' style='color:rgba(0,0,0,.25)'/>
                </a-input>
                <br/>
                <br/>
                <a-button type='primary' class='login-btn' @click='loginFun'>登录</a-button>
                <br/>
                <br/>
                <div>
                    <a-tooltip placement="top">
                        <template slot="title">
                            功能暂未开放，如有疑问请联系管理员：chuwk@xxx.com！
                        </template>
                        <span class='forget' @click='forgetPwdFun'>忘记密码？</span>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template slot="title">
                            功能暂未开放，如有疑问请联系管理员：chuwk@xxx.com！
                        </template>
                        <span class='register' @click='registerFun'>注册用户</span>
                    </a-tooltip>
                </div>
                <div class="bottom-info">
                    Copyright<i class="anticon anticon-copyright"></i> 2018 chuwk 工作室出品 
                </div>
            </a-col>
            <a-col :xs="3" :sm="6" :md="8" :lg="8" :xl="9" :xxl="10"></a-col>
        </a-row>        
    </div>
</template>

<script>
  export default {
    data () {
        return {
            user: '',
            pwd : ''
        }
    },
    methods: {
        // 登录
        loginFun() {
            let self = this;
            if(!self.user) {
                this.$message.warning('用户名不能为空，请输入！');
                return false;
            }
            if(!self.pwd) {
                this.$message.warning('密码不能为空，请输入！');
                return false;
            }
            console.log(self.user);
            console.log(self.pwd);
            // 跳转到工作台页面
            self.$router.push({ path: '/dashboard' });
        },
        // 忘记密码
        forgetPwdFun() {
            let self = this;

        },
        // 注册用户
        registerFun() {
            let self = this;

        }
    }
  }
</script>
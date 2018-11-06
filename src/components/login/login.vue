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
                    <span class='register' @click='registerFun'>注册用户</span>
                </div>
                <div class="bottom-info">
                    Copyright<i class="anticon anticon-copyright"></i> 2018 chuwk 工作室出品 
                </div>
            </a-col>
            <a-col :xs="3" :sm="6" :md="8" :lg="8" :xl="9" :xxl="10"></a-col>
        </a-row>
        <a-modal
            title           ='注册用户'
            :visible        ='regeristerModel'
            :confirmLoading ='okBtnLoading'
            @ok             ='handleOk'
            okText          ='注册'
            @cancel         ='handleCancel'
            cancelText      ='取消'
        >
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                    label='用户名'
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16 }"
                    fieldDecoratorId="regUser"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '用户名不能为空' }]}"
                    :max='6'
                >
                    <a-input placeholder="请输入用户名..."/>
                </a-form-item>
                <a-form-item
                    label='密码'
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16 }"
                    fieldDecoratorId="regPwd"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空' }]}"
                >
                    <a-input type='password' placeholder="请输入密码..."/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import ActionUrl from '../../assets/js/action.url.js';
    import http from '../../assets/js/http.js';

    export default {
        data () {
            return {
                user           : '',     // 登录用户名
                pwd            : '',     // 登录密码
                regUser        : '',     // 注册用户名
                regPwd         : '',     // 注册密码
                regeristerModel: false,  // 显示注册modal
                okBtnLoading   : false   // modal确定按钮loading
            }
        },
        methods: {
            // 登录
            async loginFun() {
                let self = this;
                if(!self.user) {
                    self.$message.warning('用户名不能为空，请输入！');
                    return false;
                }
                if(!self.pwd) {
                    self.$message.warning('密码不能为空，请输入！');
                    return false;
                }
                const { data } = await http.post(ActionUrl.login.query.url, { username: self.user, password: self.pwd });
                if(data.code === 'success') {
                    sessionStorage.setItem('loginAuth', data.message);
                    sessionStorage.setItem('token', data.token);
                    self.$router.push({ path: '/dashboard' });
                } else {
                    self.$message.warning('登录失败，请输入正确的用户名和密码！');
                }
            },
            // 忘记密码
            forgetPwdFun() {
                let self = this;

            },
            // 显示注册用户modal
            registerFun() {
                let self = this;
                self.regeristerModel = true;
            },
            // modal确定
            handleOk() {
                let self = this;
                self.form.validateFields(
                    async (err, values) => {
                        if (!err) {
                            self.okBtnLoading = true;
                            const { data } = await http.post(ActionUrl.login.register.url, { username: values.regUser, password: values.regPwd });
                            if(data.code === 'success') {
                                self.$message.success(data.message);
                                self.regeristerModel = false;
                                self.okBtnLoading = false;
                            } else {
                                self.$message.warning('注册失败，请联系管理员chuwk@xxx.com！');
                            }
                        }
                    },
                )
            },
            // modal取消
            handleCancel() {
                let self = this;
                self.regeristerModel = false;
            }
        }
    }
</script>
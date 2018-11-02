<style scoped lang='scss'>
    @import '../assets/scss/personInfo.scss';
</style>

<template>
    <div class="person-info-content">
        <a-form @submit="submitFormFun" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item
                label='用户名'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="username"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名！', whitespace: true}]}"
            >
                <a-input placeholder="请输入用户名"/>
            </a-form-item>
            <a-form-item
                label='密码'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码！', whitespace: true}, {validator: validatePwd}]}"
            >
                <a-input type="password" placeholder="请输入密码"/>
            </a-form-item>
            <a-form-item
                label='确认密码'
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                fieldDecoratorId="confirmPassword"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入确认密码！', whitespace: true}, {validator: validateCfmPwd}]}"
            >
                <a-input type="password" placeholder="请输入确认密码"/>
            </a-form-item>
            <a-form-item
                    label='手机'
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    fieldDecoratorId="telephone"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入手机号码！', whitespace: true}, {validator: validatePhone}]}"
            >
                <a-input-group compact>
                    <a-select defaultValue="86" style="width: 70px">
                        <a-select-option value="86">+86</a-select-option>
                        <a-select-option value="87">+87</a-select-option>
                    </a-select>
                    <a-input style="width: 85%" placeholder="请输入手机号码" />
                </a-input-group>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 12, offset: 5 }" >
                <a-button type='primary' htmlType='submit'>
                    修改
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    import utility from '../assets/js/utility.js';
    import ActionUrl from '../assets/js/action.url.js';
    import http from '../assets/js/http.js';

    // 表单中每一行的布局
    const formItemLayout = {
        labelCol  : { span: 5 },
        wrapperCol: { span: 7 }
    };

    export default {
        data () {
            return {
                formItemLayout
            }
        }, 
        methods: {
            // 表单提交
            submitFormFun (e) {
                let self = this;
                e.preventDefault()
                self.form.validateFields((err, values) => {
                    if (!err) {
                        // const { data } = await http.post(ActionUrl.login.update.url, { username: values.username, password: values.confirmPassword });
                        // if(data.code === 'success') {
                        //     self.$message.success('修改成功！');
                        //     self.form.resetFields();
                        // } else {
                        //     self.$message.warning('修改失败，请联系管理员！');
                        // }
                        self.$http.post(ActionUrl.login.update.url, {
                            username: values.username,
                            password: values.confirmPassword
                        }).then( (response) => {
                            if(response.body.code === 'success') {
                                self.$message.success('修改成功！');
                                self.form.resetFields();
                            } else {
                                self.$message.warning('修改失败，请联系管理员！');
                            }
                        });
                    }
                })
            },
            // 密码的自定义校验
            validatePwd(rule, value, f) {
                if(value !== "") {
                    if(value !== undefined && value.length < 6) {
                        f('请输入正确格式的密码！');
                    }
                }
                // *** 此处必须添加此方法，不然第一次提交表单的时候，无法完成校验 ***
                f();
            },
            // 确认密码的自定义校验
            validateCfmPwd(rule, value, f) {
                if(value !== "") {
                    if(value !== undefined && value.length < 6) {
                        f('请输入正确格式的确认密码！');
                    } else {
                        if(this.form.getFieldValue('password') !== this.form.getFieldValue('confirmPassword')) {
                            f('两次密码输入不一致，请重新输入密码！');
                        }
                    }
                }
                f();
            },
            // 手机的自定义校验
            validatePhone(rule, value, f) {
                if(value !== "") {
                    if(value !== undefined && !utility.regPhone(this.form.getFieldValue('telephone'))) {
                        f('请输入正确格式的电话号码！');
                    }
                }
                f();
            }
        }
    }
</script>

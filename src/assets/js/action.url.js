let ActionUrl = {
    // 登录
    login: {
        login: {
            url: 'login/login',
            type: 'post'
        },
        register: {
            url: 'login/register',
            type: 'post'
        }
    },
    user: {
        get: {
            url: 'user/getUsers',
            type: 'post'
        }
    }
};

export default ActionUrl;
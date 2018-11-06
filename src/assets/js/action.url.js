let ActionUrl = {
    // 登录
    login: {
        query: {
            url: 'login/query',
            type: 'post'
        },
        register: {
            url: 'login/register',
            type: 'post'
        },
        update: {
            url: 'login/update',
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
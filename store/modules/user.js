import Cookies from 'js-cookie';

const user = {
    state: {
        auth: {}
    },
    getters: {
        auth(state, getters) {
            return state.auth;
        }
    },
    mutations: {
        set(state, {type, items}) {
            state[type] = items;
        },
        logout(state, vm) {
            Cookies.remove('auth');
        }
    }
};

export default user;

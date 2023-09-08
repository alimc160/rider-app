const state = {
	auth_token: null,
	user : {}
};
const getters = {
	isAuthenticated: state => !!state.auth_token,    
};
const actions = {
	async LogIn({commit}, payload) {
	  	await commit('setAuthToken', payload);
	},

	async LogOut({commit}){
	  	let auth_token = null;
	  	commit('logout', auth_token);
	},
};
const mutations = {
	setAuthToken(state, response){
        state.auth_token = response.token;
        state.user = response.admin;
		axios.defaults.headers.common['Authorization'] = response.auth_token;
    },
    logout(state){
        state.auth_token = null;
		state.user = {}
		// axios.defaults.headers.common['Authorization'] = state.auth_token;
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};
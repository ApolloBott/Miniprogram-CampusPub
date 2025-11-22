import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user.js'
import m_posts from '@/store/m_posts' // 新增

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		'm_user': moduleUser,
		m_posts // 新增
	}
})

export default store
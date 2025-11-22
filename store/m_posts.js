export default {
  namespaced: true,
  
  state: {
    newPublishedPost: null, // 新发布的帖子
    targetPage: '' // 目标页面标识
  },
  
  mutations: {
    // 设置新发布的帖子
    setNewPost(state, payload) {
      state.newPublishedPost = payload.post;
      state.targetPage = payload.targetPage;
    },
    
    // 清空新帖子数据
    clearNewPost(state) {
      state.newPublishedPost = null;
      state.targetPage = '';
    }
  },
  
  getters: {
    // 判断当前页面是否为目标页面
    shouldShowNewPost: (state) => (currentPage) => {
      return state.targetPage === currentPage && state.newPublishedPost !== null;
    }
  }
}

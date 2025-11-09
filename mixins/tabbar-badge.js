import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('m_user', ['token', 'code', 'userBase']),
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      
    }
  }
}

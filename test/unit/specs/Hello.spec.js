import Vue from 'vue'
import router from '@/router'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor({router}).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to your Bridge Club')
  })
})

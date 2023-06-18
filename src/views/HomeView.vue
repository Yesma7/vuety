<template>
  <div class="container">
    <header>
      <Header msg="Welcome to Your Vue.js App"/>
    </header>

    <section class="mt-5">
      <component :is="actualComponent"></component>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import InitialVue from '@/components/Initial.vue'
import AboutMe from '@/components/AboutMe.vue';
import Php from '@/components/Php.vue';
import Laravel from '@/components/Laravel.vue';
import Python from '@/components/Python.vue';

//Emitter
import { inject, onMounted } from 'vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    InitialVue,
    AboutMe,
    Php,
    Laravel,
    Python
  },
  data() {
    return {
      actualComponent: InitialVue
    }
  },
  mounted() {
      const emitter = inject("emitter")

      emitter.on('switchComponent', (status) => {
        console.log(status)
        this.actualComponent = status
      })
  }
}
</script>

<template>
  <div class="login">
    <!-- POURQUOI ???? Mettre des messages innutil ???-->
    <Header msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Login',
  components: {
    Header,
    HelloWorld
  }
}
</script>

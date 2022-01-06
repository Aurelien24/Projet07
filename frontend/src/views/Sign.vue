<template>
  <div class="sign">
    <!-- POURQUOI ???? Mettre des messages innutil ???-->
    <Header msg="Welcome to Your Vue.js App"/>
    <SignOn msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SignOn from '@/components/SignOn.vue'

export default {
  name: 'Sign',
  components: {
    Header,
    SignOn,
  }
}
</script>

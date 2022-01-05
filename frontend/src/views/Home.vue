<!--<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
//import Header from '@/components/Header.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
   // Header,
    HelloWorld
  }
}
</script>-->
<script>
import Bootstrap from './components/Bootstrap.vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'


export default {
	name: 'App',
	components: {
    Bootstrap,
    Header,
    Home
	}
}
</script>

<template>
	<!--<div id="app">
		<nav>
			<Header />
			<a href="/about">À propos</a>
			<a href="/contact">Contact</a>
		</nav>
		<p>Bienvenue sur notre page d'<Header /></p>
	</div>

   ou juste :-->

  <div id="app">
    <Bootstrap />
		<Header />
    <Home />
	</div>

  
</template>

<style lang="scss">
  body{
    margin: 0px;
  }
</style>

<!--
<style lang="scss">

    nav {
        height: 20px;
        display: flex;
        background-color: aqua;

      a 
      {
        text-decoration: none;
      }
    }

</style>
-->
<template>
<div class="home">
  <!-- Peut inclure les props-->
  <Header/>
  <div class="pas-connecter flex center bg-secondary">
    <div class="connexion">
      <div class="title">
        <h1>Vous êtes "connecter"</h1>
        <button>Vos publications</button>
        <button>Nouveauté</button>
      </div>
      <div v-for="post in posts" v-bind:key="post.id" class="post">
        <p class="title"> Part : {{post.userId}}</p>
        <p>{{post.text}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src             setTimeout(() => {this.posts=data}, 5000)
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  mounted() {
    console.log("bonjour");
    fetch("http://localhost:3000/api/post")
    .then(response => response.json())
      .then(data => this.posts=data)
  },
  data() {
    return {
      posts : []
    }
  }
}
</script>

<style lang="scss">
// h1 seize ?
.pas-connecter {
	width: 100%;
  height: calc(100vh - 60px);
}
.post {
  margin-top: 15px;
  padding: 5px;
  //border: 1px, solid, black;
  border: solid;

  .title {
    text-align: left;
    margin-top: 5px;
  }
}
</style>
<template>
	<div class="pas-connecter flex center bg-secondary">
		<div class="connexion">
            <div class="title">
                <h1>Vous êtes "connecter"</h1>
                <button>Vos publications</button>
                <button>Nouveauté</button>
                <ul>
                    <li v-for="post in posts" v-bind:key="post.id"> mon text : {{post.text}}</li>
                </ul>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  name: 'Whall',
  props: {
    posts: {
        type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// h1 seize ?
.pas-connecter {
	width: 100%;
    height: calc(100vh - 30px);
}
</style>
<template>
	<div class="newPost">
		<form>
            <div class="form-groupe flex">
                <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="email" required="true" minlength="2" maxlength="255" spellcheck="true" v-model="text"/>
            </div>
            <!-- un truc pour ajouter une image piste : <input type="file" class="form-control" name="imagejoin" accept="image/gif, image/jpeg, image/WebP" required="false" v-model="image"/>  Note : WebP est un format datant de 2010 léger et adapter au web-->
            <div class="button flex">
                <button v-on:click="addPost()" class="bg-primary h5" type="submit">Connexion</button>
            </div>
        </form>
	</div>
</template>

<script>
export default {
  name: 'NewPost',
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
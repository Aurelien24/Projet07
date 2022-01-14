<template>
	<div class="newPost">
		<form>
            <div class="form-groupe flex">
                <input type="text" class="form-control" placeholder="JeanMarcel@yahoo.com" name="email" required="true" minlength="2" maxlength="255" spellcheck="true" v-model="email"/>
            </div>
            <div class="button flex">
                <button v-on:click="addCom()" class="bg-primary h5" type="submit">Connexion</button>
            </div>
        </form>
	</div>
</template>

<script>
export default {
  name: 'NewCom',
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
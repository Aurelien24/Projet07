<template>
	<div class="pas-connecter flex center bg-secondary">
		<div class="connexion">
            <div class="title">
                <h1>Veuiller vous connecter</h1>
            </div>
            <div class="formulaire">
                <form>
                    <div class="form-groupe flex">
                        <label for="nom">Votre nom :</label>
                        <input type="text" class="form-control" placeholder="Jean" name="username" id="nom" required="true"/>
                    </div>
                    <div class="form-groupe flex">
                        <label for="pass">Votre mot de passe :</label>
                        <input type="password" class="form-control" placeholder="******" name="password" id="nom" required="true"/>
                    </div>
                    <div class="button flex">
                        <button class="bg-primary h5">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  name: 'Wall'
}
</script>
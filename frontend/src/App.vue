<template>
  <router-view/>
</template>

<style lang="scss">

// Couleur
// fond header
$bg-primary : #6dc9f0;
// fond corps de page
$bg-secondary : #F0F2F5;
//$bg-tertiary : #dee0e4ee;
$couleurSecondair : #107761;
$policePrincipal : black;


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $policePrincipal;

    //&.router-link-exact-active {
    //  color: #107761;
    //}
  }
}

body{
  margin:0px;
}

// gestion des couleurs
.bg-primary-perso {
  background-color: $bg-primary;
}
.bg-secondary-perso {
  background-color: $bg-secondary;
}
//.bg-tertiary {
//  background-color: $bg-tertiary;
//}
a:hover {
  color: $couleurSecondair;
}
p, a {
  color: $policePrincipal;
} 
// taille du fond
.bg-seize{
  width: 100%;
  min-height: calc(100vh - 60px);
}
// gestion des liens
a 
{
  text-decoration: none;
}
// règle a suppr ?
a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}
// gestion des bouttonsy
button
{
  border: none;
  border-radius: 15px;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
[role=button] {
  cursor: pointer;
}
// gestion de flex
.flex
{
  display: flex;
}
.space-around{
  justify-content:space-around;
}
.center{
  justify-content: center;
}

// Anti répétition
nav, button, .connexion {
  margin: auto;
  height: min-content;
}
// Gestion des polices
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $policePrincipal;
}

// Taille polices
.title > h1 {
  font-size: 30px;
}
.title2 > h2 {
    font-size: 25px;
  }
.h3 {
  font-size: 20px;
}
#logo {
  height: 20px;
}
#logo:hover {
  margin-top: 6px;
  height: 22px;
  border-bottom: solid 2px black;
}

.maxWidth700px{
    max-width: 700px;
}

@media (min-width: 600px) { 
  .title > h1 {
    font-size: 35px;
  }
  .title2 > h2 {
    font-size: 30px;
  }
  .h3 {
    font-size: 28px;
  }
  #logo {
    height: 28px;
  }
  #logo:hover {
    margin-top: 6px;
    height: 31px;
    border-bottom: solid 3px black;
  }
}


</style>
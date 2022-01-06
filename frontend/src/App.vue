<template>
  <router-view/>
</template>

<style lang="scss">


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #107761;
    }
  }
}
</style>

<style lang="scss">

body{
  margin:0px;
}

// gestion des couleurs
.bg-primary {
  background-color: #6dc9f0;
}
.bg-secondary {
  background-color: #F0F2F5;
}
a:hover {
  color: #107761;
}
p, a {
  color: black;
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
  color: #2c3e50;
}
</style>
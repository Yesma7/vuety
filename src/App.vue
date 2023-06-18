<template>
  <router-view/>
</template>

<style>
:root {
  --vuety: 'Alex Brush', cursive;
  --text: 'League Spartan', sans-serif;
  --mainColor: #BE2596;
}
html {
  font-size: 62.5%;
}

body {
  background-color: var(--mainColor)!important;
  font-size: 1.6rem;
}
h1, h2, h3, h4, h5 {
  font-family: var(--text);
  font-weight: 700;
  color: #FFFFFF;
}
p {
  font-family: var(--text);
  font-weight: 300;
  color: #FFFFFF;
}
h1.vuety {
  font-family: var(--vuety);
  font-size: 13rem;
  color: #FFFFFF;
}
h1.title {
  font-size: 5rem;
  font-weight: 700;
}
h2.title {
  font-size: 3rem;
  font-weight: 700;
}
.text {
  font-size: 3rem;
}
.code {
  font-size: 2rem;
}
.centrar {
  margin: 0 auto;
  display: block;
}

/*Card*/
.card {
  background-color: transparent!important;
  border: none!important;
}
h5.card-title {
  font-size: 2.5rem;
  font-weight: 700;
}
p.card-text {
  font-size: 2rem;
}
</style>

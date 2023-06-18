<template>
  <div class="header">
    <div class="header__button mt-5 text-center">
      <a href="https://github.com/Yesma7" target="blank" class="btn btn-light">Mi repositorio <i
          class="fa-brands fa-github"></i></a>
    </div>

    <div class="header__title mt-4">
      <h1 class="vuety text-center">Vuety</h1>
      <p class="text-center fs-2 text-white">By: Yesma7</p>
    </div>

    <div class="header__nav">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a @click="switchComponent('InitialVue')" class="nav-link" aria-current="page" href="#"><i class="fa-solid fa-house-fire"></i> Inicio</a>
              </li>
              <li class="nav-item">
                <a @click="switchComponent('AboutMe')" class="nav-link" href="#"><i class="fa-brands fa-vuejs"></i> Sobre Vuety</a>
              </li>
              <li class="nav-item">
                <a @click="switchComponent('Php')" class="nav-link" href="#"><i class="fa-brands fa-php"></i> Php</a>
              </li>
              <li class="nav-item">
                <a @click="switchComponent('Laravel')" class="nav-link" href="#"><i class="fa-brands fa-laravel"></i> Laravel</a>
              </li>
              <li class="nav-item">
                <a @click="switchComponent('Python')" class="nav-link" href="#"><i class="fa-brands fa-python"></i> Python</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
//Emitter
import { inject } from 'vue'

export default {
  name: 'Header',
  setup() {
    const emitter = inject("emitter")

    const switchComponent = (component) => {
      console.log(component)
      emitter.emit('switchComponent', component)
    }
    return {switchComponent}
  }
}
</script>

<style scoped>
:root {
  --vuety: 'Alex Brush', cursive;
  --text: 'League Spartan', sans-serif;
  --mainColor: #BE2596;
}

a.btn-light {
  width: 20rem;
  height: 4rem;
  border-radius: 2rem;

  font-size: 2rem;
  font-family: var(--text);
  color: var(--mainColor);
}

.collapse {
  justify-content: center;
}
.navbar-nav {
  column-gap: 5rem;
}
.nav-link {
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--text);
}
</style>

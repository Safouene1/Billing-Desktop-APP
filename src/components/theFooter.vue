<template>
  <a class="mt-5 mb-3" href="https://github.com/Safouene1">Made by <span class="safouen">Safouen </span> with
    <svg class="bi bi-heart-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill-rule="evenodd"/>
    </svg>
  </a>
</template>

<script>
export default {
  name: "theFooter"
}
</script>

<style scoped>
a {
  color: #fff;
  font-size: 1em;
  text-decoration: none;
  display: inline-block;
  position: relative;
  font-family: 'Dosis', sans-serif;
  cursor: pointer;
}

svg {
  color: #ba000d;
}

/* effect-shine */
a:hover {
  color: #fff;
  -webkit-mask-image: linear-gradient(-75deg, rgba(0, 0, 0, .6) 30%, #000 50%, rgba(0, 0, 0, .6) 70%);
  -webkit-mask-size: 200%;
  animation: shine 1.5s infinite;
}

@-webkit-keyframes shine {
  from {
    -webkit-mask-position: 150%;
  }

  to {
    -webkit-mask-position: -50%;
  }
}
</style>
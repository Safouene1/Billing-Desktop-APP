<template>
  <div class="container mt-4">

    <div id="demo">

      <div class="modal-dialog">
        <div :class="{animationShake : animate}" class="modal-content   ">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
              <svg class="bi bi-exclamation-lg" fill="currentColor" height="20" viewBox="0 0 16 16" width="20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
              </svg>
              Attention
            </h4>
            <button class=" btn btn-dark" type="button" @click="closeModal">
              <svg class="bi bi-x-circle-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body mb-2">êtes-vous sûr de vouloir quitter? <br/> vos modifications ne seront pas
            enregistrées
            <div class="py-2">
              <button class="btn btn-dark mx-3" type="button" @click="closeModal">Retour</button>
              <button class="btn btn-danger" type="button" @click="closeInvoice">Oui , Fermer</button>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "warningModal",

  methods: {
    ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_INVOICE']),
    closeModal() {
      this.TOGGLE_MODAL();
    },
    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE();
    },

  },
  computed: {
    ...mapState(['animate'])
  }


}

</script>

<style scoped>

.modal-content {
  color: #e4e6eb;
  position: fixed;
  width: 30%;
  background-color: #3a3b3c;
  z-index: 2000000;

}

.animationShake {
  animation: shake 0.5s;

}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
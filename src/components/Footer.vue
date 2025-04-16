vue
<script setup>
import { useRouter } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.min.css'
const router = useRouter()

const goHome = () => {
  router.push({ path: '/' })
}

const openWebsite = () => {
  window.open('https://mallorca-golf.es/#book/', '_blank')
}

const teeTimeBooking = () => {
  router.push({ path: '/golf-courses' })
}
</script>

<template>
  <footer class="sticky-footer">
    <div class="footer-icons">
      <i class="fas fa-home" @click="goHome"></i>
      <button class="booking-button" @click="teeTimeBooking">Tee Time booking...</button>
      <i class="fas fa-external-link-alt" @click="openWebsite"></i>
    </div>
  </footer>
</template>

<style scoped>
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #25486A; /* oder eine andere Farbe */
  z-index: 1000; /* sicherstellen, dass es über anderen Elementen ist */
  color: white;
  height: 55px;
  padding-top: 5px;
}

.footer-icons {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertikale Zentrierung */
}

i {
  font-size: 24px;
  cursor: pointer;
}

i.fas.fa-home {
  margin-left: 20px;
}

i.fas.fa-external-link-alt {
  margin-right: 20px;
}

.booking-button {
  background-color: #28a745; /* Grüner Hintergrund für den Button */
  color: white; /* Weiße Schriftfarbe */
  border: none; /* Keine Umrandung */
  border-radius: 5px; /* Abgerundete Ecken */
  padding: 6px 20px; /* Innenabstand */
  cursor: pointer; /* Zeiger-Cursor */
  font-size: 16px; /* Schriftgröße */
  transition: background-color 0.3s; /* Übergangseffekt für Hover */
  margin: 0 20px; /* Abstand zu den Icons */
}

.booking-button:hover {
  background-color: #218838; /* Dunklerer Grünton beim Hover */
}
</style>
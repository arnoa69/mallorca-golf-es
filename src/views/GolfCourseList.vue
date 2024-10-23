vue
<script setup>
import { ref } from 'vue';

const modalVisible = ref(false);
const selectedCourse = ref('');
const requiresNewTab = ref(false);
const iframeLoadError = ref(false);

// Kursnamen und URLs mit Flags
const courses = {
  andratx: { name: 'GOLF ANDRATX', url: 'https://open.imaster.golf/en/andratx/disponibilidad', openInModal: true },
  santaponsa1: { name: 'SANTA PONSA 1', url: 'https://open.imaster.golf/es/santa-ponsa/disponibilidad', openInModal: true },
  santaponsa2: { name: 'SANTA PONSA 2 & 3', url: 'https://open.imaster.golf/en/andratx/disponibilidad', openInModal: true },
  calvia: { name: 'GOLF CALVIA', url: 'https://tgolf.golfmanager.com/consumer/ebookings?i=1', openInModal: true },
  bendinat: { name: 'GOLF DE BENDINAT', url: 'https://open.imaster.golf/en/bendinat/disponibilidad', openInModal: true },
  sonvida: { name: 'ARABELLA GOLF SON VIDA', url: 'https://arabella.golfmanager.com/consumer/ebookings?resource=&resourcetype=2', openInModal: false },
  sonmuntaner: { name: 'GOLF DE SON MUNTANER', url: 'https://arabella.golfmanager.com/consumer/ebookings?resource=&resourcetype=1', openInModal: false },
  sonquint: { name: 'GOLF DE SON QUINT', url: 'https://arabella.golfmanager.com/consumer/ebookings?resource=&resourcetype=3', openInModal: false },
  sontermes: { name: 'GOLF DE SON TERMES', url: 'https://open.imaster.golf/en/son-termes/disponibilidad', openInModal: true },
  puntiro: { name: 'T GOLF PALMA PUNTIRO', url: 'https://tgolfpalma.golfmanager.com/consumer/ebookings', openInModal: false },
  songual: { name: 'GOLF SON GUAL', url: 'https://songual.golfmanager.com/consumer/ebookings', openInModal: false },
  maioris: { name: 'GOLF MAIORIS', url: 'https://open.imaster.golf/es/maioris/disponibilidad', openInModal: true },
  antemeast: { name: 'GOLF DE SON ANTEM EAST', url: 'https://sonantem.golfmanager.com/consumer/ebookings', openInModal: false },
  antemwest: { name: 'GOLF DE SON ANTEM WEST', url: 'https://sonantem.golfmanager.com/consumer/ebookings?resource=&resourcetype=2', openInModal: false },
  dor: { name: 'VALL D‘OR GOLF', url: 'https://open.imaster.golf/es/valldorgolf/disponibilidad', openInModal: true },
  sonservera: { name: 'CLUB DE GOLF SON SERVERA', url: 'https://open.imaster.golf/es/sonservera/disponibilidad', openInModal: true },
  pula: { name: 'PULA GOLF', url: 'https://open.imaster.golf/es/pula/disponibilidad', openInModal: true },
  canyamel: { name: 'CANYAMEL GOLF', url: 'https://open.imaster.golf/en/canyamel/disponibilidad', openInModal: true },
  capdepera: { name: 'CAPDEPERA GOLF', url: 'https://open.imaster.golf/en/capdepera/disponibilidad', openInModal: true },
  alcanada: { name: 'CLUB DE GOLF ALCANADA', url: 'https://open.imaster.golf/en/alcanada/disponibilidad', openInModal: true },
  pollenca: { name: 'POLLENҪA GOLF', url: 'https://open.imaster.golf/es/golfpollensa/disponibilidad', openInModal: true },
};

const openModal = (course) => {
  selectedCourse.value = course;
  requiresNewTab.value = !courses[course].openInModal; // Setze requiresNewTab basierend auf dem Flag
  iframeLoadError.value = false;
  modalVisible.value = true;
};

const openCoursePage = () => {
  const url = courses[selectedCourse.value].url;
  if (url) {
    window.open(url, '_blank');
  }
  modalVisible.value = false;
};

const iframeLoaded = () => {
  iframeLoadError.value = false;
};

const iframeError = () => {
  iframeLoadError.value = true;
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center text-white">Golf Course List</h1>
    <div class="list-group">
      <button
        v-for="(course, key) in courses"
        :key="key"
        class="list-group-item list-group-item-action bg-primary text-white"
        @click="openModal(key)"
      >
        {{ course.name }}
      </button>
    </div>
    <div v-if="modalVisible" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">{{ requiresNewTab ? 'Open Course Page' : courses[selectedCourse].name }}</h5>
            <button type="button" class="close" @click="modalVisible = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <template v-if="requiresNewTab">
              <p>Please click the button below to visit the booking page in a new tab.</p>
              <button class="btn btn-success" @click="openCoursePage">
                {{ courses[selectedCourse].name }} Open booking page
              </button>
            </template>
            <template v-else>
              <iframe
                :src="courses[selectedCourse].url"
                @load="iframeLoaded"
                @error="iframeError"
                style="width: 100%; min-height: 666px; border: none;"
              ></iframe>
              <div v-if="iframeLoadError" class="alert alert-danger mt-2">
                <p>Error loading booking page. Please try again later or click the button below to open the page in a new tab.</p>
                <button class="btn btn-success" @click="openCoursePage">
                  {{ courses[selectedCourse].name }} Open booking page
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #25486A; /* Primary background color */
  padding: 20px;
  border-radius: 8px;
}
h1 {
  margin-bottom: 20px; /* Optional: add some margin at the bottom */
}
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #1b3651; /* Slightly darker on hover */
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  margin: 0;
}
.modal-header {
  background-color: #1b3651; /* Kontrastfarbe für den Header */
  position: relative; /* Positionierung für den Schließen-Button */
}

.close {
  position: absolute; /* Absolute Positionierung */
  right: 5px; /* Abstand von 5px vom rechten Rand */
  top: 10px; /* Optional: Vertikaler Abstand vom oberen Rand */
}
.modal-body {
  min-height: 666px;
  padding: 20px;
}
.alert {
  margin-top: 20px;
}
</style>
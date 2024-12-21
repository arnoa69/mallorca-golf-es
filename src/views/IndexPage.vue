<template>
  <div class="pdf-container">
    <div v-if="error" class="error-message">
      Fehler beim Laden der PDF-Datei: {{ error }}
    </div>
    <div v-else ref="pdfViewer" class="pdf-viewer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const pdfUrl = '/golf-guide.pdf';
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(0);
let viewer = null;

const pdfViewer = ref(null);

onMounted(async () => {
  try {
    // Korrekt: Zugriff über window.WebViewer
    if (typeof window.WebViewer === 'undefined') {
        console.error("WebViewer wurde nicht geladen!");
        error.value = "WebViewer konnte nicht geladen werden.";
        return;
    }
    viewer = new window.WebViewer({
      path: '/webviewer/lib', // Wichtig: Pfad korrekt angeben
      initialDoc: pdfUrl,
      licenseKey: 'fvKgZ4TZ7ozpDxJdJUKH', // Ersetze dies mit deinem Lizenzschlüssel
    }, pdfViewer.value);

    // ... (Rest des Codes)
  } catch (err) {
    error.value = err.message;
    console.error("Fehler beim Laden von WebViewer:", err);
  }
});

onUnmounted(() => {
  if (viewer) {
    viewer.dispose();
    viewer = null;
  }
});

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    viewer.docViewer.setCurrentPage(currentPage.value);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    viewer.docViewer.setCurrentPage(currentPage.value);
  }
};
</script>

<style scoped>
.pdf-container {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pdf-viewer {
  width: 100%;
  height: 100%;
}

.error-message {
  color: red;
  text-align: center;
  padding: 20px;
}

.pdf-toolbar {
  text-align: center;
  margin-top: 10px;
  width: 100%;
}
</style>
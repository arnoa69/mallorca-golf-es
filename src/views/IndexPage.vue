<script setup>
import { ref, onMounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.5.136/build/pdf.worker.min.mjs';

const currentPage = ref(1);
const totalPages = ref(0);
const loading = ref(true);
let pdfDoc = null;
const currentPageImage = ref('');
const zoomLevel = ref(1); // Default zoom level

const pageLinks = ref({
  2: [
    { href: 'https://www.nolte-mallorca.com', text: '', position: 'top' },
  ],
  4: [
    { href: 'https://www.greentechbalear.com', text: '', position: 'top' },
  ],
  6: [
    { href: 'https://www.rainbowhomemallorca.com', text: '', position: 'top' },
  ],
  8: [
    { href: 'https://www.aguaris.com', text: '', position: 'top' },
  ],
  18: [
    { href: 'http://www.climawolf.es', text: '', position: 'top' },
    { href: 'http://www.ak-allesnachmass.com', text: '', position: 'bottom left' },
    { href: 'https://www.sa-baierle.com', text: '', position: 'bottom right' },
  ],
  22: [
    { href: 'http://www.wurzer-spedition.de', text: '', position: 'top' },
    { href: 'https://www.stiff.es', text: '', position: 'bottom' },
  ],
  24: [
    { href: 'http://www.deutsche-augen-klinik.de', text: '', position: 'top' },
    { href: 'https://www.finca-amapola.com', text: '', position: 'bottom' },
  ],
  32: [
    { href: 'http://www.wks-sl.com', text: '', position: 'top' },
  ],
  34: [
    { href: 'http://www.yeswe.bike', text: '', position: 'top' },
  ],
  42: [
    { href: 'http://www.robertmaiermachtsbad.de', text: '', position: 'top' },
    { href: 'https://www.morissemetal.com', text: '', position: 'bottom' },
  ],
  44: [
    { href: 'http://www.s-tecpalma.com', text: '', position: 'top' },
    { href: 'https://www.hyla-mallorca.es', text: '', position: 'bottom' },
  ],
  50: [
    { href: 'http://www.blancaterra.com', text: '', position: 'top' },
  ],
  72: [
    { href: 'http://www.benzinger-spedition.de', text: '', position: 'top' },
    { href: 'https://www.mallorca-kamine.com', text: '', position: 'bottom' },
  ],
  76: [
    { href: 'http://www.lehmann-umzuege.ch', text: '', position: 'top' },
    { href: 'https://www.perfectmallorca.com', text: '', position: 'bottom' },
  ],
  78: [
    { href: 'http://www.huether-mallorca.eu', text: '', position: 'top' },
    { href: 'https://www.kanzlei-menth.de', text: '', position: 'bottom' },
  ],
  82: [
    { href: 'http://www.dehaas-immobilien.com', text: '', position: 'top' },
    { href: 'mailto:picht-saez@outlook.com', text: '', position: 'top' },
  ],
  84: [
    { href: 'http://www.vistanueva.art', text: '', position: 'top' },
  ],
  98: [
    { href: 'http://www.baugutachter-mallorca.com', text: '', position: 'top' },
  ],
  107: [
    { href: 'http://www.buensonido.es', text: '', position: 'top' },
  ],
  108: [
    { href: 'http://www.sunseeker-mallorca.es', text: '', position: 'top' },
  ]
});

const getLinkStyle = (index, totalLinks) => {
  const styles = {
    1: [
    { top: 0, left: 0, right: 0, height: '100%' }, // Vollbild
    ],
    2: [
      { top: 0, left: 0, right: 0, height: '50%' }, // Obere Hälfte
      { top: '50%', left: 0, right: 0, height: '50%' }, // Untere Hälfte (links)
    ],
    3: [
      { top: 0, left: 0, right: 0, height: '50%' }, // Obere Hälfte
      { top: '50%', left: 0, right: '50%', height: '50%' }, // Untere linke Hälfte
      { top: '50%', left: '50%', right: 0, height: '50%' }, // Untere rechte Hälfte
    ],
    4: [
      { top: 0, left: 0, right: 0, height: '50%' }, // Obere Hälfte
      { top: '50%', left: 0, right: '50%', height: '50%' }, // Untere linke Hälfte
      { top: '50%', left: '50%', right: 0, height: '50%' }, // Untere rechte Hälfte
    ],
  };

  return styles[totalLinks][index];
};

const loadPDF = async () => {
  loading.value = true;
  try {
    const loadingTask = pdfjsLib.getDocument('/golf-guide.pdf'); // Ensure this path is correct
    pdfDoc = await loadingTask.promise;
    totalPages.value = pdfDoc.numPages;
    await renderPage(currentPage.value); // Render the first page initially
    loading.value = false;
  } catch (error) {
    console.error('Error loading PDF:', error);
    loading.value = false; // Setze loading auf false, um den Ladezustand zu beenden
  }
};

const renderPage = async (pageNum) => {
  try {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;

    // Convert canvas to image URL and set it to currentPageImage
    currentPageImage.value = canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error rendering page:', error);
  }
};

// Watch for changes in currentPage and render the corresponding image
watch(currentPage, async (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    await renderPage(newPage);
  }
});

// Zoom In function
const zoomIn = () => {
  zoomLevel.value = Math.min(3, zoomLevel.value + 0.1); // Max zoom level of 3x
};

// Zoom Out function
const zoomOut = () => {
  zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.1); // Min zoom level of 0.5x
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  loadPDF();
});
</script>
<template>
  <div class="container mt-5">
    <div class="pdf-viewer">
      <div v-if="loading" class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="image-container" v-show="!loading">
        <div class="scrollable-image">
          <img 
            :src="currentPageImage" 
            alt="PDF Page" 
            class="pdf-page" 
            v-if="currentPageImage" 
            :style="{ transform: `scale(${zoomLevel})` }" 
          />
          <a 
            v-if="pageLinks[currentPage]" 
            v-for="(link, index) in pageLinks[currentPage]" 
            :key="link.href" 
            :href="link.href" 
            target="_blank" 
            class="link" 
            :style="getLinkStyle(index, pageLinks[currentPage].length)"
          ></a>
        </div>
      </div>

      <div class="controls">
        <div class="navigation">
          <button class="btn btn-secondary btn-small" @click="prevPage" :disabled="currentPage === 1">
            <i class="fas fa-chevron-left"></i>
          </button>
          <input v-model.number="currentPage" type="number" :min="1" :max="totalPages" class="form-control w-25"
            @change="goToPage(currentPage)" />
          <span class="font-color">/ {{ totalPages }}</span>
          <button class="btn btn-secondary btn-small" @click="nextPage" :disabled="currentPage === totalPages">
            <i class="fas fa-chevron-right"></i>
          </button>
          <div class="zoom-controls">
            <button class="btn btn-secondary" @click="zoomIn">+</button>
            <button class="btn btn-secondary" @click="zoomOut">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-image {
  position: relative; /* Ermöglicht absolute Positionierung der Links */
  max-height: 90vh; /* Limit für die Höhe des Bildes */
  overflow-y: auto; /* Vertikales Scrollen aktivieren */
  width: 100%; /* Volle Breite für das Scrollen */
}

.link {
  position: absolute; /* Absolute Positionierung */
  background-color: rgba(255, 255, 255, 0); /* Unsichtbarer Hintergrund */
  pointer-events: auto; /* Aktiviert die Links */
}

/* Beispiel-Positionierungsstile */
.link:nth-child(1) {
  top: 0; /* Obere Ecke */
  left: 0; /* Linke Ecke */
  right: 0; /* Rechte Ecke */
  height: 50%; /* Obere Hälfte */
}

.link:nth-child(2) {
  top: 50%; /* Untere Hälfte */
  left: 0; /* Linke Ecke */
  right: 0; /* Rechte Ecke */
  height: 50%; /* Untere Hälfte */
}

.link:nth-child(3) {
  top: 0; /* Obere Ecke */
  left: 0; /* Linke Ecke */
  right: 50%; /* Rechte Ecke (linke Hälfte) */
  height: 50%; /* Obere Hälfte */
}

.link:nth-child(4) {
  top: 0; /* Obere Ecke */
  left: 50%; /* Rechte Ecke (rechte Hälfte) */
  right: 0; /* Rechte Ecke */
  height: 50%; /* Obere Hälfte */
}

.pdf-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.image-container {
  width: 110%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  /* Prevent overflow of the image initially */
}

.scrollable-image {
  max-height: 90vh;
  /* Limit the height of the image */
  overflow-y: auto;
  /* Enable vertical scrolling */
  width: 100%;
  /* Full width for scrolling */
}

.pdf-page {
  width: 100%;
  /* Adjust width to 100% */
  max-height: none;
  /* Allow height to be controlled by zoom */
  object-fit: contain;
  transition: transform 0.2s ease;
  /* Smooth transition for zooming */
}

.controls {
  margin-top: 10px;
  /* Space between image and controls */
  display: flex;
  justify-content: center;
  /* Center controls */
  align-items: center;
  /* Align items vertically */
  margin-bottom: 20px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-small {
  font-size: 0.85rem;
  /* Slightly smaller font size */
  padding: 0.25rem 0.5rem;
  /* Smaller padding */
}

.zoom-controls {
  display: flex;
  gap: 10px;
  /* Space between zoom buttons */
  margin-left: 15px;
  /* Space from navigation buttons */
}

.form-control.w-25 {
  width: 17% !important;
  font-size: 12px;
}

.font-color {
  color: white;
  font-weight: bold;
}
</style>
<template>
  <section id="camera-section"
           aria-label="Camera Section">
    <div class="stack">
      <video autoplay
             ref="videoRef"
             muted="true"></video>

      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 576 512"
           class="icon">
        <path fill="currentColor"
              d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
      </svg>

      <canvas ref="canvasRef"
              style="display: none"></canvas>

      <img alt=""
           ref="imageRef">
    </div>

    <div class="controls">
      <button ref="playButtonRef"
              title="Play"
              @click="handlePlay">
        Open Camera
      </button>
      <button ref="pauseButtonRef"
              title="Pause"
              @click="handlePause">Pause</button>
      <button ref="screenshotButtonRef"
              title="ScreenShot"
              @click="handleImageCapture">Take Photo</button>
    </div>

    <dl v-if="response">
      <dt>Name:</dt>
      <dd v-text="response.name"></dd>
      <dt>Description:</dt>
      <dd v-text="response.description"></dd>
      <dt>Dimensions</dt>
      <dd>Height: {{ response.dimensions.height }}</dd>
      <dd>Width: {{ response.dimensions.width }}</dd>
      <dd>Depth: {{ response.dimensions.depth }}</dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { actions } from 'astro:actions';
import { ref, onMounted } from 'vue';
import { dataToBlob } from '../utilities/dataToBlob'
import { fileToGenerativePart } from '../utilities/fileToGenerativePart';

const playButtonRef = ref<HTMLButtonElement>();
const pauseButtonRef = ref<HTMLButtonElement>();
const screenshotButtonRef = ref<HTMLButtonElement>();
const canvasRef = ref<HTMLCanvasElement>();
const imageRef = ref<HTMLImageElement>();
const videoRef = ref<HTMLVideoElement>();
const devices = ref<MediaDeviceInfo[]>([]);
const streamStarted = ref(false);
const selectedCamera = ref(null);

interface Response {
  description?: string;
  name?: string;
  [key: string]: any;
}

const response = ref<Response | null>(null);

const constraints = ref({
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
    facingMode: "environment"
  }
})

onMounted(() => {
  getCameraSelection();
})

const getCameraSelection = async () => {
  const videoDevices = await navigator.mediaDevices.enumerateDevices();
  devices.value = videoDevices.filter((device) => device.kind === 'videoinput');
}

const handleStream = (stream: MediaStream) => {
  if (videoRef.value) {
    videoRef.value.srcObject = stream;
    streamStarted.value = true;
  }
}

const startStream = async (constraints: MediaStreamConstraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
}


const handlePlay = () => {
  if (streamStarted.value) {
    videoRef.value?.play();
  }

  if (navigator.mediaDevices) {
    const updatedConstraints = {
      ...constraints.value,
      deviceId: {
        exact: selectedCamera.value
      }
    }

    startStream(updatedConstraints);
  }
}

const handlePause = () => {
  videoRef.value?.pause();
}

const handleImageCapture = () => {
  handlePause();

  if (canvasRef.value) {
    if (videoRef.value) {
      canvasRef.value.height = videoRef.value.videoHeight ?? 0;
      canvasRef.value.width = videoRef.value.videoWidth ?? 0;
      const context = canvasRef.value.getContext('2d');

      if (context && videoRef.value) {
        context.drawImage(videoRef.value, 0, 0);

        if (imageRef.value) {
          imageRef.value.src = canvasRef.value.toDataURL('image/webp');

          submitImage();
        }
      }
    }
  }
}

const submitImage = async () => {
  if (imageRef.value) {
    const photo = imageRef.value.src

    const imageFile = new File([dataToBlob(photo)], "image.webp", {
      type: "image/webp"
    });

    const image = await fileToGenerativePart(imageFile);

    try {
      const { data, error } = await actions.gemini.getResponse(image)
      if (data) {
        const parsedData = JSON.parse(data);
        response.value = parsedData;

        if (parsedData?.description) {
          imageRef.value.alt = parsedData.description;
        }
      }

      if (error) {
        throw new Error(error.message || error.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style>
#camera-section {
  margin-block-start: 1.5rem;

  >*+* {
    margin: 0;
    margin-block-start: 1.5rem;
  }
}

.stack {
  display: grid;
  grid-template-areas: 'stack';

  >* {
    aspect-ratio: 16/9;
    grid-area: stack;
    display: block;
    width: 100%;
    height: auto;
  }

  video {
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }

  .icon {
    height: 4rem;
    place-self: center;
  }

}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;


  button {
    flex: 1;
    font-size: 1.2rem;
    padding: 0.65rem;
  }
}
</style>
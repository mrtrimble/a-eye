<template>

  <video autoplay
         ref="videoRef"></video>

  <canvas ref="canvasRef"
          style="display: none"></canvas>

  <!-- <div v-if="devices.length">
    <select name=""
            id=""
            ref="cameraOptionRefs"
            v-model="selectedCamera">
      <option v-for="device in devices"
              :key="device.deviceId"
              :value="device.deviceId">
        Select camera
      </option>
    </select>
  </div> -->

  <img alt=""
       ref="imageRef">

  <div class="controls">
    <button ref="playButtonRef"
            title="Play"
            @click="handlePlay">Play</button>
    <button ref="pauseButtonRef"
            title="Pause"
            @click="handlePause">Pause</button>
    <button ref="screenshotButtonRef"
            title="ScreenShot"
            @click="handleImageCapture">Take Photo</button>
  </div>

  <div v-html="response"
       v-if="response"></div>
</template>

<script setup lang="ts">
import { actions } from 'astro:actions';
import { ref, onMounted } from 'vue';
import { dataToBlob } from '../utilities/dataToBlob'
import { fileToGenerativePart } from '../utilities/fileToGenerativePart';

const playButtonRef = ref<HTMLButtonElement>();
const pauseButtonRef = ref<HTMLButtonElement>();
const screenshotButtonRef = ref<HTMLButtonElement>();
// const cameraOptionRefs = ref(null);
const canvasRef = ref<HTMLCanvasElement>();
const imageRef = ref<HTMLImageElement>();
const videoRef = ref<HTMLVideoElement>();
const devices = ref<MediaDeviceInfo[]>([]);
const streamStarted = ref(false);
const selectedCamera = ref(null);
const response = ref('');

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

    console.log({ image });
    console.log(typeof image);

    try {
      const { data, error } = await actions.gemini.getResponse(image)
      if (data) {
        response.value = data;

        console.log(response.value)
      }

      if (error) {
        throw new Error(error.message || error.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }
}


// import { ref } from 'vue';
// import { marked } from 'marked';

// interface FormFields {
//   photo: File;
// }

// const response = ref('');

// const submitHandler = async (fields: FormFields) => {
//   // Let's pretend this is an ajax request:

//   const { photo } = fields;

//   console.log(typeof photo);

//   debugger;

//   try {
//     const { data, error } = await actions.gemini.getResponse(photo)
//     if (data) {
//       response.value = await marked.parse(data);
//     }

//     if (error) {
//       throw new Error(error.message || error.toString());
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
</script>
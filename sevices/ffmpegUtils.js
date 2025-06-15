// ffmpeg/ffmpegLoader.js
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpegInstance = null;

export const getFFmpeg = () => {
  if (!ffmpegInstance) {
    ffmpegInstance = new FFmpeg();
  }
  return ffmpegInstance;
};

export const loadFFmpeg = async (onLog = null) => {
  try {
    const ffmpeg = getFFmpeg();
    if (ffmpeg.loaded) {
      // alert('FFmpeg déjà chargé');
      return;
    }

    if (onLog) {
      ffmpeg.on("log", ({ message }) => onLog(message));
    }

    const baseURL = "/assets/js/ffmpeg";

    console.log("Préparation des URLs…");
    const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
    const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
    const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript");
    console.log("URLs chargées :", { coreURL, wasmURL, workerURL });

    console.log("Chargement FFmpeg en cours…");
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL,
    });
    console.log("Chargement FFmpeg terminé");
    // alert('FFmpeg chargé avec succès');
  } catch (error) {
    console.error("Erreur lors du chargement de FFmpeg:", error);
    // alert("Erreur FFmpeg: " + error.message);
  }
};


// export const loadFFmpeg = async (onLog = null) => {
//   // alert('loading start');

//   try {
//     const ffmpeg = getFFmpeg();
//     // console.log("getFFmpeg OK");

//     const baseURL = "/assets/js/ffmpeg";

// // const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
// // const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
// // const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript");

//     // const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm";
//     // const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
//     // const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm";
//     if (ffmpeg.loaded) {
//       alert('Déjà chargé');
//       return;
//     }

//     if (onLog) {
//       ffmpeg.on("log", ({ message }) => onLog(message));
//     }

//     // console.log("avant coreURL");
//     // const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
// // const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
// // const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript");

//     const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
//     console.log("coreURL OK");

//     const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
//     console.log("wasmURL OK");

//     const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript");
//     console.log("workerURL OK");
// alert('loading')
//     await ffmpeg.load({
//       coreURL,
//       wasmURL,
//       workerURL,
//     });

//     alert('FFmpeg chargé avec succès');
//   } catch (error) {
//     console.error("Erreur lors du chargement de FFmpeg:", error);
//     alert("Erreur FFmpeg: " + error.message);
//   }
// };

// export const loadFFmpeg = async (onLog = null) => {
//   alert('loading');
//   try {
//     const ffmpeg = getFFmpeg();
//     if (ffmpeg.loaded) {
//       alert('Déjà chargé');
//       return;
//     }

//     if (onLog) {
//       ffmpeg.on("log", ({ message }) => onLog(message));
//     }

//     const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm";

//     const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
//     const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
//     const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript");

//     await ffmpeg.load({
//       coreURL,
//       wasmURL,
//       workerURL,
//     });

//     alert('FFmpeg chargé avec succès');
//   } catch (error) {
//     console.error("Erreur lors du chargement de FFmpeg:", error);
//     alert("Erreur FFmpeg: " + error.message);
//   }
// };

// export const loadFFmpeg = async (onLog = null) => {

//   alert('loading')

//   const ffmpeg = getFFmpeg();
//   if (ffmpeg.loaded) return;

//   if (onLog) {
//     ffmpeg.on("log", ({ message }) => onLog(message));
//   }

//   const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm";
//   await ffmpeg.load({
//     coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
//     wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
//     workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
//   });
// };

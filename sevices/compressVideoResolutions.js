import { fetchFile } from '@ffmpeg/util';
import { getFFmpeg , loadFFmpeg } from './ffmpegUtils';



export const convertVideoToResolutions = async (file, resolutions = []) => {
    // alert('test')
    await loadFFmpeg();
   
    const ffmpeg = getFFmpeg();
  // alert('avance')
    const inputName = "input.mp4";
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    // alert('next')
    const convertedFiles = [];
  
    for (const res of resolutions) {
      const outputName = `output_${res}p.mp4`;
      const height = parseInt(res);
      
      // Conversion avec -vf scale pour adapter la hauteur
      await ffmpeg.exec([
        "-i", inputName,
        "-vf", `scale=-2:${height}`,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "28",
        outputName,
      ]);
  
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      const convertedFile = new File([blob], outputName, { type: "video/mp4" });
  

      console.log("convertedFile")
      console.log(convertedFile)
      convertedFiles.push({ resolution: res, file: convertedFile });
    }
  
    return convertedFiles;
  };
  
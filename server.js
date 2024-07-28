const express = require('express');
const { bundle } = require('@remotion/bundler');
const { getCompositions, renderMedia } = require('@remotion/renderer');
const fs = require("fs");

const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});

const app = express();
const port = 9000;

app.use(express.json());

app.post('/render', async (req, res) => {
  try {
    // 假设视频组件的路径
    const compositionId = 'MyVideo';
    const entry = './src/index.js';

    console.log('Creating a Webpack bundle of the video');
    const bundleLocation = await bundle(entry);

    console.log('Getting the compositions');
    const comps = await getCompositions(bundleLocation, {
      inputProps: req.body,
    });

    const composition = comps.find((c) => c.id === compositionId);
    if (!composition) {
      throw new Error(`No composition with the ID ${compositionId} found`);
    }

    const outputLocation = `out/${compositionId}.mp4`;

    console.log('Rendering video');
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation,
      inputProps: req.body,
    });

    // 上传文件至OSS
    console.log('Render complete');
   
    try {

      const currentDate = new Date().getTime();
  
      // 生成文件名
      const fileName = `${compositionId}${currentDate}.mp4`;
  
      console.log(fileName); // 输出格式为 YYYYMMDD，例如 20240717
  
      const fileData = fs.createReadStream(outputLocation);
  
      let result = await client.putStream(fileName, fileData);
      
  
      console.log(result);
      res.json({ message: 'Video rendered successfully', result });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }



  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
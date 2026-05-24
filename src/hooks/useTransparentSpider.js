import { useState, useEffect } from "react";
import spiderLogo from "../assets/images/spider-logo.jpg";

export const useTransparentSpider = () => {
  const [transparentSpiderUrl, setTransparentSpiderUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = spiderLogo;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width || 120;
      tempCanvas.height = img.height || 120;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(img, 0, 0);

      try {
        const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imgData.data;

        // Find bounding box of the spider (dark pixels)
        let minX = tempCanvas.width;
        let maxX = 0;
        let minY = tempCanvas.height;
        let maxY = 0;
        let hasSpider = false;

        for (let y = 0; y < tempCanvas.height; y++) {
          for (let x = 0; x < tempCanvas.width; x++) {
            const idx = (y * tempCanvas.width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // If the pixel is dark (part of the spider logo)
            if (r < 185 && g < 185 && b < 185) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              hasSpider = true;
            }
          }
        }

        if (hasSpider) {
          const spiderW = maxX - minX + 1;
          const spiderH = maxY - minY + 1;
          
          // Create a perfectly square canvas centered on the spider bounding box
          const size = Math.max(spiderW, spiderH);
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          
          // Draw cropped & centered spider
          const offsetX = (size - spiderW) / 2;
          const offsetY = (size - spiderH) / 2;
          
          // Draw pixel by pixel to make background transparent
          const newImgData = ctx.createImageData(size, size);
          const newData = newImgData.data;
          
          // Initialize with transparent (alpha = 0)
          for (let i = 3; i < newData.length; i += 4) {
            newData[i] = 0;
          }
          
          for (let y = 0; y < spiderH; y++) {
            for (let x = 0; x < spiderW; x++) {
              const srcX = minX + x;
              const srcY = minY + y;
              const srcIdx = (srcY * tempCanvas.width + srcX) * 4;
              
              const r = data[srcIdx];
              const g = data[srcIdx + 1];
              const b = data[srcIdx + 2];
              
              if (r < 185 && g < 185 && b < 185) {
                const destX = Math.round(offsetX + x);
                const destY = Math.round(offsetY + y);
                const destIdx = (destY * size + destX) * 4;
                
                if (destIdx >= 0 && destIdx < newData.length) {
                  newData[destIdx] = 0;       // R
                  newData[destIdx + 1] = 0;   // G
                  newData[destIdx + 2] = 0;   // B
                  newData[destIdx + 3] = 255; // Opaque
                }
              }
            }
          }
          
          ctx.putImageData(newImgData, 0, 0);
          setTransparentSpiderUrl(canvas.toDataURL());
        } else {
          setTransparentSpiderUrl(spiderLogo);
        }
      } catch (err) {
        console.warn("Failed to process spider image transparently:", err);
        setTransparentSpiderUrl(spiderLogo);
      }
    };
  }, []);

  return transparentSpiderUrl;
};

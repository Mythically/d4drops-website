import React, { useEffect, useState } from "react";
import "./imageUpload.css";
import Tesseract from "tesseract.js";
import { PSM } from "tesseract.js";

function ImageUpload() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  // useEffect(() => {
  //   console.log("useEffect");
  //   console.log(files);
  //   console.log(files.length);
  // }, [files]);

  const handleFileChange = (event) => {
    console.log("change");
    setFiles([...files, ...event.target.files]);
  };

  const handleDrop = (event) => {
    console.log(event);
    // console.log(event.dataTransfer.files)
    // console.log(event.target.files + "target")
    event.preventDefault(); // Prevent default behavior (opening image in the browser)
    console.log("dropped");
    setFiles([...files, ...event.dataTransfer.files]);
    console.log(files);
    setDragging(false);
    // handleProcessImages();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleProcessImages = async () => {
    // if (processing) {
    //   console.log("processing");
    //   return;
    // }
    // if (files.length === 0) {
    //   console.log("no files");
    //   return;
    // }

    setProcessing(true);
    await handleImageLoad();
  };

  const handleImageLoad = async () => {
    console.log("handleImageLoad");
    if (files.length === 0) {
      setProcessing(false); // Reset processing state if no files
      return;
    }

    const scheduler = Tesseract.createScheduler();
    const workerPromises = Array.from({ length: 2 }, async () => {
      const worker = await Tesseract.createWorker({
        logger: ({ progress, userJobId, progressId }) => {
          // console.log(`progress: ${progress}`);
        },
      });
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      await worker.setParameters({
        tessedit_char_whitelist:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()",
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      scheduler.addWorker(worker);
    });
    await Promise.all(workerPromises);

    const results = await Promise.all(
      files.map(async (file) => {
        const imageBlob = file.slice(0, file.size, file.type);
        const imageUrl = URL.createObjectURL(new Blob([imageBlob]));
        const result = await scheduler.addJob("recognize", imageUrl);
        URL.revokeObjectURL(imageUrl);
        return result;
      })
    );

    await scheduler.terminate();

    setFiles([]);
    setProcessing(false);

    results.forEach((result) => console.log(result.data.text));
  };

  useEffect(() => {
    handleProcessImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className={"drop-area-div"}>
      <form
        className={"drop-area-form"}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label
          htmlFor="file"
          className={`drop-area${dragging ? "dragging" : ""}`}
        >
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
          <p>Drag and drop images here, or click to upload</p>
        </label>
      </form>
      {processing && (
        <div className="modal">
          <div className="modal-content">
            <p>Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

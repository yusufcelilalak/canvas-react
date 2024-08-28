import React, { useEffect, useRef } from "react";
import { Canvas, Textbox, FabricImage, Image } from "fabric";
import {
  PencilIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ItalicIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Button from "./button";

const CanvasWrapper: React.FC = () => {
  const canvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const canvas = new Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundColor: "#fff",
    });
    canvasRef.current = canvas;

    const canvasWrapper = document.getElementById("canvas-wrapper");

    if (canvasWrapper) {
      canvas.setDimensions({
        width: canvasWrapper.clientWidth,
        height: canvasWrapper.clientHeight,
      });
    }

    canvas.on("object:added", (e) => {
      if (e.target && e.target.type === "textbox") {
        canvas.bringObjectToFront(e.target);
      }
    });

    return () => {
      // Dispose of the canvas to prevent memory leaks
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

  const addText = () => {
    if (canvasRef.current) {
      const text = new Textbox("Text", {
        left: 100,
        top: 100,
        width: 200,
      });
      canvasRef.current.add(text);
      canvasRef.current.bringObjectToFront(text);
    }
  };

  const addSvg = () => {
    // Add SVG logic
  };

  const addImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input dialog
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          const img = await FabricImage.fromURL(e.target.result);
          img.scaleToHeight(100);
          img.left = 100;
          img.top = 100;
          canvasRef.current!.add(img);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const undo = () => {
    if (canvasRef.current) {
      // Handle undo logic here
    }
  };

  const redo = () => {
    if (canvasRef.current) {
      // Handle redo logic here
    }
  };

  const zoomIn = () => {
    if (canvasRef.current) {
      canvasRef.current.setZoom(canvasRef.current.getZoom() * 1.1);
    }
  };

  const zoomOut = () => {
    if (canvasRef.current) {
      canvasRef.current.setZoom(canvasRef.current.getZoom() / 1.1);
    }
  };

  const buttonClass =
    "p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center relative group";

  const tooltipClass =
    "absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100";

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex container mx-auto">
        <div className="w-1/4 p-4 bg-gray-100/70 flex flex-col space-y-4 border-l border-y border-slate-900/50 rounded-l-md">
          <Button
            onClick={addText}
            icon={<ItalicIcon className="h-6 w-6" />}
            tooltip="Add Text"
          />
          <Button
            onClick={addSvg}
            icon={<PencilIcon className="h-6 w-6" />}
            tooltip="Add SVG"
          />
          <Button
            onClick={addImage}
            icon={<PhotoIcon className="h-6 w-6" />}
            tooltip="Add Image"
          />
          <Button
            onClick={undo}
            icon={<ArrowUturnLeftIcon className="h-6 w-6" />}
            tooltip="Undo"
          />
          <Button
            onClick={redo}
            icon={<ArrowUturnRightIcon className="h-6 w-6" />}
            tooltip="Redo"
          />
          <Button
            onClick={zoomIn}
            icon={<MagnifyingGlassPlusIcon className="h-6 w-6" />}
            tooltip="Zoom In"
          />
          <Button
            onClick={zoomOut}
            icon={<MagnifyingGlassMinusIcon className="h-6 w-6" />}
            tooltip="Zoom Out"
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
          />
        </div>
        <div
          className="flex-1 flex justify-center items-center border-y border-r border-l border-slate-900/50 rounded-r-md"
          id="canvas-wrapper"
        >
          <canvas id="canvas" className=" rounded-r-md" />
        </div>
      </div>
    </div>
  );
};

export default CanvasWrapper;

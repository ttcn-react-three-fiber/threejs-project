import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";
import Picker from "./Picker";

import ShoeModel from "./ShoeModel";
// ShoeModel.js này e đang để ở client.

// import ShoeModel from 'http://localhost:8080/uploads/shoemodel.js'
// giờ e muốn import kiểu như này nhưng nó k tìm thấy.
// dùng lazy load thì e cũng k load đk từ url này.
// import ReadTextFile from "./api";
// import getModel from './data/api';
// const ShoeModel = System.has("http://localhost:8080/uploads/shoemodel.js");
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
// laces: "#ffffff",
// mesh: "#ffffff",
// caps: "#ffffff",
// inner: "#ffffff",
// sole: "#ffffff",
// stripes: "#ffffff",
// band: "#ffffff",
// patch: "#ffffff",
const state = proxy({
  count: 0,
  current: null,
  items: {},
});
console.log(state.items);

export default function App() {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <ShoeModel state={state} />
          <Environment preset="city" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={1.5}
            far={0.8}
          />
        </Suspense>
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <Picker state={state} />
    </>
  );
}

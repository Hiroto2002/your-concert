import React from "react";
import ReactDOM from 'react-dom/client';
import { Body } from "./Body";
import Three from "./three/sample";
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'


const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
    <Body/>
);


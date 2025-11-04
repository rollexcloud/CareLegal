"use client";
import { ImagesSlider } from "./ui/images-slider";
import { motion } from "motion/react";
import React from "react";
  const images = [
    "https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  function About () {
     return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-l md:text-3xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          This Section is about Utkarsh <br></br> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum fugit corporis soluta dolores laborum deserunt dignissimos vel dolor culpa iusto, quas odit quos nostrum, saepe voluptatum quisquam modi hic quibusdam?
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
  }
 
export default About

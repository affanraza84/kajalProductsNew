'use client'

import { WavyBackground } from "./ui/wavy-background"
import { AnimatedTooltip } from "./ui/animated-tooltip";


const people = [
    {
      id: 1,
      name: "Muhammad Sarfaraz Ahmad",
      designation: "Business Mentor",
      image:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd2VyfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Muhammad Niyaz Ahmad",
      designation: "Owner",
      image:
        "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zmxvd2VyfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Muhammad Aiyaz Ahmad",
      designation: "Sales & Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zmxvd2VyfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      name: "Muhammad Faiyaz Quadri",
      designation: "Branch Manager",
      image:
        "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 5,
      name: "Mufti Riyaz Ahmad Misbahi",
      designation: "Buiseness Advisor",
      image:
        "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      name: "Muhammad Salahuddin Ansari",
      designation: "Buiseness Advisor",
      image:
        "https://images.unsplash.com/photo-1442458017215-285b83f65851?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

function Instructors() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="tex-2xl md:text-4xl lg:text-7xl text-pink-700 font-bold text-center mb-8">Our Visionary Leaders</h2>
            <p className="text-base md:text-lg text-black text-center mb-4">Meet the skilled experts who will guide you through a delightful culinary journey at our company.</p>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={people}/>
            </div>
        </WavyBackground>
    </div>
  )
}

export default Instructors
"use client";

import MenCollection from "@/components/MenCollection";
import Intro from "@/components/Intro";
import WomenCollection from "@/components/WomenCollection";
import Jewelery from "@/components/Jewelery";
import Electronics from "@/components/Electronics";

export default function Home() {
  return (
      <main className="gap-y-3 flex flex-col">
        <Intro />
        <MenCollection />
        <div className="flex justify-center md:h-[113vh] overflow-hidden">
          <div className="">
            <WomenCollection />
          </div>
          <h1 className="absolute text-9xl text-center flex-col top-[194vh] hidden md:block left-[95vh]">
            HAPPY <span className="flex ">SHOPPING</span>
          </h1>
          <div className="hidden md:block">
            <img
              src={"https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              width={710}
              height={200}
              className="opacity-65"
              alt={"img"}
            />
          </div>
        </div>
        <div className="flex justify-center md:h-[113vh] overflow-hidden">
          <h1 className="absolute text-9xl text-center flex-col top-[235vh] hidden md:block left-[30vh]">
            SALE <span className="flex ">LIVE!</span>
          </h1>
          <div className="hidden md:block">
            <img
              src={"https://images.pexels.com/photos/15647174/pexels-photo-15647174/free-photo-of-young-woman-wearing-traditional-clothing-and-a-crown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              width={710}
              height={200}
              className="opacity-65"
              alt={"img"}
            />
          </div>
          <div className="">
            <Jewelery />
          </div>
        </div>
        <Electronics />
      </main>
  );
}

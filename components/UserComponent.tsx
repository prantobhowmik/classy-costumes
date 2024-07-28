import React from "react";
import {User} from "@nextui-org/react";

const username = ""

export default function UserComponent() {
  return (
    <User
        className="flex flex-col items-center justify-center -gap-5 font-bold pt-2"
      avatarProps={{
        src: "https://www.researchgate.net/publication/256542851/figure/fig10/AS:668627976085514@1536424740865/Lena-Original-image-150-150-pixel-resolution.ppm"
      }}
     name={username? username :"USER"}/>
  );
}

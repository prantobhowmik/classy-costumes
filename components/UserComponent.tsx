import React from "react";
import {User} from "@nextui-org/react";

export default function UserComponent() {
  return (
    <User
        className="flex flex-col items-center justify-center font-bold pt-2"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
  );
}

// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Displayhome from "./Displayhome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayref = useRef();

  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId).bgColor
      : "#121212";
  console.log(bgColor);

  useEffect(() => {
    if (isAlbum) {
      displayref.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayref.current.style.background = "#121212";
    }
  });

  return (
    <div
      ref={displayref}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#1212121] text-white overflow-auto lg:w-[75%] ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<Displayhome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id == albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;

import React, { useEffect } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import FileUploader from "../components/file-uploader";
import excelSvg from "../assets/excel2.svg";

export default function Question() {
  return (
    <div className="flex items-center flex-col bg-blue-300 w-screen h-screen">
      <QuestionCard />
      <Progress />
      <FileUploader className={"mt-10"}>
        <img className="w-6 h-6 mr-2" src={excelSvg} />
      </FileUploader>
    </div>
  );
}

function QuestionCard() {
  return (
    <div className="w-screen sm:max-w-min h-min p-6 items-center mt-4 rounded-xl bg-white shadow-lg">
      <div className="text-center text-xl font-bold">Cooking</div>
      <div className="flex flex-col sm:flex-row justify-center mx-24 mt-4 items-center gap-2 sm:gap-12">
        <Options />
      </div>
      <div className="flex mt-6 justify-between">
        <img className="w-12 h-12" src={leftArrow}></img>
        <div className="mt-8">1/10</div>
        <img className="w-12 h-12" src={rightArrow}></img>
      </div>
    </div>
  );
}

function Options() {
  const options = [
    "Option1",
    "Option2",
    "Option3",
    "Option3",
    "Option3",
    "Option3",
  ];
  const listOptions = options.map((item, index) => (
    <div key={index} className="whitespace-nowrap">
      <input className="mr-1" type="radio" value={item} />
      {item}
    </div>
  ));

  return listOptions;
}

function Progress() {
  const progresses = [null, null, null, null, null, true, false];
  return (
    <div className="flex flex-col items-center mt-4">
      Progress
      <div className="w-40 flex-wrap flex self-start bg-blue-200">
        {progresses.map((item) => (
          <div className="border border-red-400 w-[20%] h-8"></div>
        ))}
      </div>
    </div>
  );
}

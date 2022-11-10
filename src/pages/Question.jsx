import React, { useEffect, useState } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import FileUploader from "../components/file-uploader";
import excelSvg from "../assets/excel2.svg";
import QuestionsAPI from "../services/QuestionsAPI";

export default function Question() {
  const [questions, setQuestions] = useState();
  const [progress, setProgress] = useState(0);

  function extractExcel(file) {
    const data = new FormData();
    data.append("file", file);
    QuestionsAPI.getQuestions(data, getQuestionsCb);
  }

  function getQuestionsCb(isSuccess, data) {
    console.log("data", data);
    setQuestions(data);
  }

  return (
    <div className="flex items-center flex-col bg-blue-300 w-screen h-screen">
      {questions ? (
        <QuestionCard
          totalQuestion={questions.length}
          currentQuestion={progress}
        />
      ) : undefined}
      <Progress questions={questions} currentQuestion={progress} />
      <FileUploader className={"mt-10"} handleFileUpload={extractExcel}>
        <img className="w-6 h-6 mr-2" src={excelSvg} />
      </FileUploader>
    </div>
  );
}

function QuestionCard({ totalQuestion, currentQuestion }) {
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

function Progress({ questions }) {
  const progresses = [null, null, null, null, null, true, false];
  if (questions) {
    return (
      <div className="flex flex-col items-center mt-4">
        Progress
        <div className="w-40 flex-wrap flex self-start bg-blue-200">
          {questions.map((question) => (
            <div className="border border-red-400 w-[20%] h-8"></div>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

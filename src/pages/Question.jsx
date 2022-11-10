import React, { useEffect, useState } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import FileUploader from "../components/file-uploader";
import excelSvg from "../assets/excel2.svg";
import QuestionsAPI from "../services/QuestionsAPI";

export default function Question() {
  const [questions, setQuestions] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choosedAnswer, setChoosedAnswer] = useState(null);

  useEffect(() => {
    console.log("question", questions);
  }, [questions]);

  function extractExcel(file) {
    const data = new FormData();
    data.append("file", file);
    QuestionsAPI.getQuestions(data, getQuestionsCb);
  }

  function getQuestionsCb(isSuccess, data) {
    console.log("data", data);
    setQuestions(
      data.map((datum) => {
        datum.isSuccess = null;
        return datum;
      })
    );
  }

  function checkQuestionAnswer() {
    if (choosedAnswer) {
      if (choosedAnswer === questions[questionIndex].answer) {
        setQuestions((current) => {
          current[questionIndex].isSuccess = true;
          return current;
        });
      } else {
        setQuestions((current) => {
          current[questionIndex].isSuccess = false;
          return current;
        });
      }
    }
  }

  function increaseProgress() {
    if (questionIndex < questions.length - 1) {
      checkQuestionAnswer();
      setQuestionIndex((prev) => prev + 1);
      setChoosedAnswer(null);
    }
  }

  function decreaseProgress() {
    if (questionIndex > 0) {
      checkQuestionAnswer();
      setQuestionIndex((prev) => prev - 1);
      setChoosedAnswer(null);
    }
  }

  return (
    <div className="flex items-center flex-col bg-blue-300 w-screen h-screen">
      {questions ? (
        <QuestionCard
          question={questions[questionIndex]}
          increaseProgress={increaseProgress}
          decreaseProgress={decreaseProgress}
          choosedAnswer={choosedAnswer}
          setChoosedAnswer={setChoosedAnswer}
        />
      ) : undefined}
      <ProgressBar questionIndex={questionIndex} questions={questions} />
      {!questions ? (
        <FileUploader className={"mt-10"} handleFileUpload={extractExcel}>
          <img className="w-6 h-6 mr-2" src={excelSvg} />
        </FileUploader>
      ) : (
        <></>
      )}
    </div>
  );
}

//TODO: What if i wanted to put progress in here?
function QuestionCard({
  question,
  increaseProgress,
  decreaseProgress,
  choosedAnswer,
  setChoosedAnswer,
}) {
  return (
    <div className="w-screen sm:max-w-min h-min p-6 items-center mt-4 rounded-xl bg-white shadow-lg">
      <div className="text-center text-xl font-bold">{question.word}</div>
      <div className="flex flex-col sm:flex-row justify-center mx-24 mt-4 items-center gap-2 sm:gap-12">
        <OptionsRadio
          options={question.options}
          choosedAnswer={choosedAnswer}
          setChoosedAnswer={setChoosedAnswer}
        />
      </div>
      <div className="flex mt-6 justify-between">
        <img
          className="w-12 h-12 cursor-pointer"
          src={leftArrow}
          onClick={decreaseProgress}
        ></img>
        <img
          className="w-12 h-12 cursor-pointer"
          src={rightArrow}
          onClick={increaseProgress}
        ></img>
      </div>
    </div>
  );
}

function OptionsKahoot({ options }) {
  const listOptions = options.map((option, index) => (
    <div key={index} className="whitespace-nowrap">
      <div className="">{option}</div>
    </div>
  ));

  return listOptions;
}

function OptionsRadio({ options, choosedAnswer, setChoosedAnswer }) {
  const listOptions = options.map((option, index) => (
    <div key={index} className="whitespace-nowrap">
      <input
        className="mr-1 cursor-pointer"
        name="answer"
        type="radio"
        value={option}
        checked={choosedAnswer === option}
        onClick={() => setChoosedAnswer(option)}
      />
      {option}
    </div>
  ));

  return listOptions;
}

function ProgressBar({ questionIndex, questions }) {
  if (questions) {
    const questionsToBeRendered = questions.map((question, index) => (
      <ProgressItem
        questionIndex={questionIndex}
        isSuccess={question.isSuccess}
        index={index}
      />
    ));

    return (
      <div className="flex flex-col items-center mt-4">
        Progress
        <div className="w-40 flex-wrap flex self-start bg-blue-200">
          {questionsToBeRendered}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function ProgressItem({ questionIndex, isSuccess, index }) {
  var progressCircle;
  if (questionIndex == index) {
    progressCircle = <div className="bg-white h-4 w-4 rounded-full"></div>;
  }
  if (isSuccess === true) {
    return (
      <div className="flex items-center justify-center bg-green-400 w-[20%] h-8">
        {progressCircle}
      </div>
    );
  } else if (isSuccess === false) {
    return (
      <div className="flex items-center justify-center bg-red-400 w-[20%] h-8">
        {progressCircle}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center border border-white bg-black w-[20%] h-8">
        {progressCircle}
      </div>
    );
  }

  return { progressBox };
}

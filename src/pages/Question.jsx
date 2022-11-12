import React, { useEffect, useState } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import FileUploader from "../components/file-uploader";
import excelSvg from "../assets/excel2.svg";
import QuestionsAPI from "../services/QuestionsAPI";
import ModeSwitcher from "../components/mode-switcher";

//TODO: Doğru ya da yanlış durumunda ses çıkart
//TODO: hafıza olayı
//TODO: google translate ile türkçe çevirisini bul
//TODO: İnci'ye yanlış yazılan birkaç kelimenin olduğunu söyle.
//LEARNED: questions itemlarından birinin içeriğini değiştirdim ama useEffect çalışmadı.
export default function Question() {
  const [questions, setQuestions] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);

  function extractExcel(file) {
    const data = new FormData();
    data.append("file", file);
    QuestionsAPI.getQuestions(data, getQuestionsCb);
  }

  useEffect(() => {
    console.log("questionsss", questions);
  }, [questions]);

  function getQuestionsCb(isSuccess, data) {
    setQuestions(
      data.map((datum) => {
        datum.isSuccess = null;
        return datum;
      })
    );
  }

  function checkQuestionAnswer(answer) {
    console.log("questionIndex", questionIndex);
    console.log("q-answer", questions[questionIndex].answer);
    if (answer) {
      if (answer === questions[questionIndex].answer) {
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
      setQuestionIndex((prev) => prev + 1);
    } else {
      setQuestionIndex(0);
    }
  }

  function decreaseProgress() {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setQuestionIndex(questions.length - 1);
    }
  }

  function increaseKahootProgress(answer) {
    checkQuestionAnswer(answer);
    increaseProgress();
  }

  return (
    <div className="flex items-center flex-col bg-blue-300 dark:bg-gray-400 w-screen h-screen">
      <ModeSwitcher />
      {questions ? (
        <QuestionCard
          question={questions[questionIndex]}
          increaseProgress={increaseProgress}
          decreaseProgress={decreaseProgress}
          increaseKahootProgress={increaseKahootProgress}
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
  increaseKahootProgress,
}) {
  return (
    <div className="w-screen sm:max-w-lg h-min p-6 items-center mt-4 rounded-xl bg-white dark:bg-gray-500 shadow-lg">
      <div className="text-center text-xl font-bold">{question.word}</div>
      <div className="flex flex-col sm:flex-row justify-center mt-4 items-center flex-wrap">
        <OptionsKahoot
          options={question.options}
          increaseKahootProgress={increaseKahootProgress}
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

function OptionsKahoot({ options, increaseKahootProgress }) {
  const colors = [
    {
      normal: "bg-red-500 dark:bg-red-800",
      hover: "hover:bg-red-400 dark:hover:bg-red-700",
    },
    {
      normal: "bg-blue-500 dark:bg-blue-800",
      hover: "hover:bg-blue-400 dark:hover:bg-blue-700",
    },
    {
      normal: "bg-yellow-500 dark:bg-yellow-800",
      hover: "hover:bg-yellow-400 dark:hover:bg-yellow-700",
    },
    {
      normal: "bg-green-500 dark:bg-green-800",
      hover: "hover:bg-green-400 dark:hover:bg-green-700",
    },
  ];
  const listOptions = options.map((option, index) => {
    const color = colors[index];
    return (
      <div
        key={index}
        className={`group ${color.normal} ${color.hover} border text-center border-black w-[50%] py-4 cursor-pointer`}
        onClick={() => increaseKahootProgress(option)}
      >
        <p className="group-hover:text-white">{option}</p>
      </div>
    );
  });
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
        <div className="w-40 flex-wrap flex self-start">
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
  var bgColor;
  if (questionIndex == index) {
    progressCircle = (
      <div
        key={index}
        className="bg-white dark:bg-gray-300 h-4 w-4 rounded-full"
      ></div>
    );
  }
  if (isSuccess === true) {
    bgColor = "bg-green-400 dark:bg-green-700";
  } else if (isSuccess === false) {
    bgColor = "bg-red-400 dark:bg-red-700";
  } else {
    bgColor = "bg-black";
  }

  return (
    <div
      key={index}
      className={`flex items-center justify-center border border-white dark:border-black ${bgColor} w-[20%] h-8`}
    >
      {progressCircle}
    </div>
  );
}

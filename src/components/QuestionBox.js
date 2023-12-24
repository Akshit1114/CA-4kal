import React, { useState } from "react";
import "./Questions.css";
import questions from "../questions";

const CustomQuestionBox = () => {
  const [customQuizState, setCustomQuizState] = useState({
    currentQuestion: 0,
    selectedOption: null,
    highlighted: false,
    darkMode: false,
    correctAnswers: 0,
    quizCompleted: false,
  });

  const {
    currentQuestion,
    selectedOption,
    highlighted,
    darkMode,
    correctAnswers,
    quizCompleted,
  } = customQuizState;

  const handleOptionSelect = (optionId) => {
    const selectedOptionData = questions[currentQuestion].options.find(
      (option) => option.id === optionId
    );

    setCustomQuizState((prevState) => ({
      ...prevState,
      selectedOption: optionId,
      correctAnswers: selectedOptionData.isCorrect
        ? prevState.correctAnswers + 1
        : prevState.correctAnswers,
      currentQuestion:
        prevState.currentQuestion < questions.length - 1
          ? prevState.currentQuestion + 1
          : prevState.currentQuestion,
      quizCompleted: prevState.currentQuestion === questions.length - 1,
    }));
  };

  const handleRestartQuiz = () => {
    setCustomQuizState({
      currentQuestion: 0,
      selectedOption: null,
      highlighted: false,
      darkMode: false,
      correctAnswers: 0,
      quizCompleted: false,
    });
  };

  const handleHighlight = () => {
    setCustomQuizState((prevState) => ({ ...prevState, highlighted: true }));
  };

  const removeHighlight = () => {
    setCustomQuizState((prevState) => ({ ...prevState, highlighted: false }));
  };

  const handleDarkMode = () => {
    setCustomQuizState((prevState) => ({
      ...prevState,
      darkMode: !prevState.darkMode,
    }));
    document.body.style.backgroundColor = darkMode ? "#333" : "#f0f0f0";
    document.body.classList.toggle("dark-mode");
  };

  const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);

  return (
    <div
      className={`CustomQuestionBox ${
        highlighted ? "custom-highlighted" : ""
      } ${darkMode ? "dark-mode" : ""}`}
    >
      {quizCompleted ? (
        <CustomQuizResult
          correctAnswers={correctAnswers}
          totalQuestions={questions.length}
          percentage={percentage}
          onRestartQuiz={handleRestartQuiz}
        />
      ) : (
        <CustomQuizContent
          currentQuestion={currentQuestion}
          questionData={questions[currentQuestion]}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          highlighted={highlighted}
          onHighlight={handleHighlight}
          onRemoveHighlight={removeHighlight}
          onDarkModeToggle={handleDarkMode}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

const CustomQuizContent = ({
  currentQuestion,
  questionData,
  selectedOption,
  onOptionSelect,
  highlighted,
  onHighlight,
  onRemoveHighlight,
  onDarkModeToggle,
  darkMode,
}) => {
  const { text, options } = questionData;
  const questionHeader = `Custom Question ${currentQuestion + 1} of 5`;

  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <h1 className="CustomTitle">Custom Quiz</h1>
      <h3 className="questionHeader">{questionHeader}</h3>
      <div className="CustomQuestion">
        <h2
          className={highlighted ? "custom-highlighted-text" : ""}
        >{`Custom Question ${currentQuestion + 1}: ${text}`}</h2>
      </div>
      <ul className="custom-options">
        {options.map((option, index) => (
          <li
            key={option.id}
            className={
              selectedOption === option.id ? "custom-selected-option" : ""
            }
            onClick={() => onOptionSelect(option.id)}
          >
            {`${getOptionLetter(index)}. ${option.text}`}
          </li>
        ))}
      </ul>
      <button
        className="CustomHigh"
        onClick={onHighlight}
        disabled={highlighted}
      >
        Highlight
      </button>
      <button
        className="RemoveCustomHighlight"
        onClick={onRemoveHighlight}
        disabled={!highlighted}
      >
        Remove Highlight
      </button>
      <button className="CustomToggle" onClick={onDarkModeToggle}>
        {darkMode ? "Custom Dark" : "Custom Light"}
      </button>
    </>
  );
};

const CustomQuizResult = ({
  correctAnswers,
  totalQuestions,
  percentage,
  onRestartQuiz,
}) => {
  return (
    <>
      <h1 className="CustomResult">Custom Quiz Result</h1>
      <p>{`You got ${correctAnswers} out of ${totalQuestions} correct!`}</p>
      <p>{`(${percentage}%)`}</p>
      <button onClick={onRestartQuiz}>Restart Custom Quiz</button>
    </>
  );
};

export default CustomQuestionBox;

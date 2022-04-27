import { Card, Avatar, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import React, { useState } from "react";
import "../css/style.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [];

  const totalQ = [
    {
      text: "A patient with a seizure disorder should not be prescribed:",
      options: [
        { id: 0, text: "Bupropion (Wellbutrin)", isCorrect: true },
        { id: 1, text: "Phenytoin (Dilantin)", isCorrect: false },
        { id: 2, text: "Fluoxetine (Prozac)", isCorrect: false },
        { id: 3, text: "Gabapentin (Neurontin)", isCorrect: false },
      ],
    },
    {
      text: "The maximum dosage prescribed for a 65-year-old patient prescribed citalopram (Celexa) is:",
      options: [
        { id: 0, text: "10mg", isCorrect: false },
        { id: 1, text: "20mg", isCorrect: true },
        { id: 2, text: "40mg", isCorrect: false },
        { id: 3, text: "60mg", isCorrect: false },
      ],
    },
    {
      text: "Signs and symptoms of lithium (Eskalith) toxicity include:",
      options: [
        { id: 0, text: "Sedation, ataxia, tremor, constipation", isCorrect: true },
        { id: 1, text: "Ataxia, tremor, diarrhea, sedation", isCorrect: false },
        { id: 2, text: "Hypervigilance, diarrhea, sedation, ataxia", isCorrect: false },
        { id: 3, text: "Tremor, ataxia, constipation, hypervigilance", isCorrect: false },
      ],
    },
    {
      text: "When adding buspirone (Buspar) to a prescribed treatment regimen of mirtazapine (Remeron) and venlafaxine (Effexor), the psychiatric nurse practitioner should make sure to include education specifically about:",
      options: [
        { id: 0, text: "Metabolic Syndrome", isCorrect: false },
        { id: 1, text: "Stevens Johnson Syndrome", isCorrect: false },
        { id: 2, text: "Prolonging of the QT interval", isCorrect: false },
        { id: 3, text: "Serotonin Syndrome", isCorrect: true },
      ],
    },
    {
      text: "When starting an SSRI, the psychiatric mental health nurse practitioner will observe for:",
      options: [
        { id: 0, text: "Activation of known or unknown bipolar disorder", isCorrect: true },
        { id: 1, text: "Neuroleptic malignant syndrome", isCorrect: false },
        { id: 2, text: "Tardive dyskinesia", isCorrect: false },
        { id: 3, text: "Jaundice", isCorrect: false },
      ],
    },
    {
      text: "A 28-year-old female patient informs the psychiatric-mental health nurse practitioner that she is three months pregnant. She has been stable on fluoxetine (Prozac) for the last two years. The patient asks whether she may safely continue this medication during her pregnancy. The nurse practitioner responds:",
      options: [
        { id: 0, text: "\"Let's review the risks and benefits of continuing or discontinuing Prozac for you and your baby.\"", isCorrect: true },
        { id: 1, text: "\"This medication is unsafe for your baby, so we'll wean you off this medication during your pregnancy and never consider adding it back.\"", isCorrect: false },
        { id: 2, text: "\"Prozac is a category B drug, which means that it's safe for you to continue on this medication during your pregnancy.\"", isCorrect: false },
        { id: 3, text: "\"Cognitive-behavioral therapy has proven to be successful during pregnancy with no risk to the fetus, so let's discontinue your Prozac.\"", isCorrect: false },
      ],
    },
    {
      text: "Which of the following drug classes has the highest potential for abuse?",
      options: [
        { id: 0, text: "Schedule I", isCorrect: true },
        { id: 1, text: "Schedule II", isCorrect: false },
        { id: 2, text: "Schedule III", isCorrect: false },
        { id: 3, text: "Schedule IV", isCorrect: false },
      ],
    },
    {
      text: "Which of the following is in DEA drug schedule IV?",
      options: [
        { id: 0, text: "Methamphetamine (Desoxyn)", isCorrect: false },
        { id: 1, text: "Alprazolam (Xanax)", isCorrect: true },
        { id: 2, text: "Marijuana", isCorrect: true },
        { id: 3, text: "Adderall (amphetamine and dextroamphetamine)", isCorrect: false },
      ],
    },
    {
      text: "How would you address a situation where a patient tells you that they have a plan to hurt themselves?",
      options: [
      ],
    },
    {
      text: "A 24-year-old female presents to your clinic demanding that her 4mg of alprazolam (Xanax) is filled as her primary care provider told her she had to see someone else to get this prescription, specifically someone specialized in mental health. How would you handle this situation?",
      options: [
      ],
    },
    {
      text: "What is your philosophy for the student/preceptor relationship?",
      options: [
      ],
    },
  ];



  /* A possible answer was clicked */
  function optionClicked(isCorrect) {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function nextQ(){
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
    var area = document.getElementById('area');
    area.value = area.defaultValue;
  }

     for (let i = 7; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = totalQ[i];
      totalQ[i] = totalQ[j];
      totalQ[j] = temp;
    }
     for(let i = 0; i < 5; i++){
      questions.push(totalQ[i]);
     }
     for(let i = 0; i < 3; i++){
      questions.push(totalQ[i + 8]);
     }



  return (
    <div className="assessment-App">
      {/* 1. Header  */}
      <Title className="mt-5 mb-5">Teleprecet Match Assessment</Title>

      {/* 2. Show results or show the question game  */}
      {showResults ? (
        /* 3. Final Results */
        <div className="assessment-final-results">
          <h1>Final Results</h1>
          <h2>
            {(score / 5) * 100}%
          </h2>
          <p className="asssessment-p">Your asssessment has been completed!</p>
        </div>
      ) : (
        /* 4. Question Card  */
        <div className="assessment-question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="assessment-question-text">{questions[currentQuestion].text}</h3>
          {(currentQuestion>=5) &&
            <>
            <textarea cols="100" rows="20" id="area"></textarea>
            < br />
            <button className="assessment-button" onClick={() => nextQ()}>Next Question</button>
            </>
          } 
          
          {/* List of possible answers  */}
          <ul className="assessment-ul">
            {questions[currentQuestion].options.map((option) => {
              return (
                
                <li className="assessment-li"
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

/* Resets the game back to default 
const restartGame = () => {
    
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };*/

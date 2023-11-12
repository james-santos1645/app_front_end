import React, { useState } from 'react';

const SurveyForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [responses, setResponses] = useState([]);

  const questions = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
    'Question 10',
  ];

  const handleStartSurvey = () => {
    setShowForm(true);
  };

  const handleRadioChange = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      // Send survey responses to the backend
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      if (response.ok) {
        console.log('Survey responses successfully sent to the backend.');
      } else {
        console.error('Failed to send survey responses to the backend.');
      }
    } catch (error) {
      console.error('Error occurred while sending survey responses:', error);
    }

    // Reset the state for the next survey
    setResponses([]);
    setShowForm(false);
  };

  return (
    <div>
      {!showForm ? (
        <button onClick={handleStartSurvey}>Take Survey</button>
      ) : (
        <div>
          <form>
            {questions.map((question, index) => (
              <div key={index}>
                <p>{question}</p>
                {[1, 2, 3, 4, 5].map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleRadioChange(index, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;

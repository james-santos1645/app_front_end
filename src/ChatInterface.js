import React, { useState, useEffect } from 'react';

const ChatInterface = ({ messages, onSendMessage }) => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '300px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.from === 'user' ? 'flex-end' : 'flex-start',
              margin: '5px',
              padding: '10px',
              background: message.from === 'user' ? '#4CAF50' : '#ddd',
              color: message.from === 'user' ? 'white' : 'black',
              borderRadius: '10px',
              maxWidth: '70%',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <button onClick={handleSendMessage}>Submit</button>
      </div>
    </div>
  );
};

export default ChatInterface;
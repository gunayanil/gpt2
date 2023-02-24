import React, { useState } from 'react';
import { OpenAIApi, Configuration } from 'openai';
import './App.css';

const config = new Configuration({
  apiKey: 'dead-inside',
});

const openai = new OpenAIApi(config);

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const generateQuery = async () => {
    const prompt = `Create a SQL request for ${text}`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setResult(response.data.choices[0].text);
  };

  return (
    <div>
      <div className='container'>
        <textarea
          rows={5}
          className='text-area'
          onChange={e => setText(e.target.value)}
          placeholder="countries start with 'A' or 'B' "
        />
        <button onClick={generateQuery} className='generate-query'>
          Generate something valid please
        </button>
        <div className='result'>
          <h4>{result}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;

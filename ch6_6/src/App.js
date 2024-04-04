import './App.css';
import { Button, Form, Input, TextArea, Feed } from 'semantic-ui-react';
import { useState } from 'react';

function App() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <Form>
        <Form.Field>
          <label htmlFor="author">Author</label>
          <Input value={author} id="author" onChange={(e) => setAuthor(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="text">Message</label>
          <TextArea value={text} id="text" onChange={(e) => setText(e.target.value)} />
        </Form.Field>
        <Button
          basic
          // нейминг полей определяется Feed
          onClick={() =>
            setMessages((m) => [
              ...m,
              { icon: 'pencil', date: new Date().toString(), summary: author, extraText: text },
            ])
          }>
          Post
        </Button>
      </Form>
      <Feed events={messages} />
    </div>
  );
}

export default App;

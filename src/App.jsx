import './App.css';
import { useState } from 'react';

function App() {
  const data = JSON.parse(localStorage.getItem('items'));
  console.log(data);
  const startingValues = data ? data : ['Hello!'];
  const [listItems, setListItems] = useState(startingValues);

  const addItem = (itemToAdd) => {
    if (itemToAdd === '') {
      return alert('Notes cannot be empty :(');
    }
    const newArr = [...listItems, itemToAdd];
    console.log(newArr);
    localStorage.setItem('items', JSON.stringify(newArr));
    setListItems(newArr);
  };

  const removeItem = (itemToRemove) => {
    const newArr = listItems.filter((item) => {
      return item !== itemToRemove;
    });

    localStorage.setItem('items', JSON.stringify(newArr));
    setListItems(newArr);
  };

  const ListItem = (props) => {
    const [strikeThrough, setStrikeThrough] = useState('');
    return (
      <li
        className={`list-item ${strikeThrough}`}
        onClick={() =>
          setStrikeThrough((prev) => {
            if (prev === 'strike-through') return '';
            return 'strike-through';
          })
        }
      >
        <h3 className={'note-text'}>{props.text}</h3>
        <button
          className='remove btn'
          onClick={() => {
            removeItem(props.text);
          }}
        ></button>
      </li>
    );
  };

  const [inputText, setInputText] = useState('');

  return (
    <>
      <h1 className='title'>Todo List Thing</h1>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItem = e.target.newNote.value;
            addItem(newItem);
            setInputText('');
          }}
          className='new-post-form'
        >
          <div className='flex-container'>
            <input
              type='text'
              name='newNote'
              placeholder='new thing'
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
            <button className='add btn'></button>
          </div>
        </form>

        <ul className='list'>
          {listItems.map((item, index) => {
            return <ListItem key={index} text={item} />;
          })}
        </ul>
        <button
          className='clear-btn'
          onClick={() => {
            localStorage.clear();
            setListItems(['Hello']);
          }}
        >
          Clear Things
        </button>
      </main>
    </>
  );
}

export default App;

import React from 'react';
import Header from '../components/header';
import ImageUpload from '../components/imageUpload';
// import ItemForm from '../components/itemForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      {/*<div className="content">*/}
        {/*<div className="column">*/}
          <ImageUpload />

        {/* <div className="column">
          <ItemForm />
        </div> */}
      {/*</div>*/}
     {/*</div>*/}
</div>
  );
}

export default App;

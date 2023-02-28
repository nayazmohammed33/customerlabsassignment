
import './App.css';
import Header from './Components/Header';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';




function App() {

  const [schema, setSchema] = useState([]);
  const [textbox, settextbox] = useState(false);
  const [textinput, settextinput] = useState("");
  const [result, setresult] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const senddata = []

  const saveSegment = () => {


    setSchema([...schema, schemaOptions]);
    settextbox(true)
  };

  const handleAddSchema = (schemaOption) => {
    // setSchema([...schema, schemaOption]);
    setresult([...result, schemaOption])

    console.log(result)


  };


  const savedatahandler = () => {
    // while sending data to below url i'm getting cors error; for cors i hve to use express js.
    // alert("Data has been sent to URL")
    alert( "segment_name  :"+textinput+""+
        
          "Schmes are "+result
    )

    const url = 'https://webhook.site/7c514d4e-3f04-43de-a35a-4481703167ec'
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        segment_name: textinput,
        schema: [
          { first_name: result.first_name },
          { last_name: result.last_name }
        ]
      })
    };
    fetch(url, requestOptions)
      .then(response => console.log('Submitted successfully'))
      .catch(error => console.log('Form submit error', error))
  };


  const clearhandler=()=>{
    window.location.reload();



  }


  return (
    <div className="App">


      <Header />



      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px'
        }}
        onClick={saveSegment}>Save Segment</button>
      {textbox ?
        <div>
          <h3>Enter the Name of Segment</h3>
          <input
            type="text" placeholder='Name of Segment' onChange={(e) => settextinput(e.target.value)}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              fontSize: '16px'
            }}
          />

        </div> : <></>}


      <div className="schema-container">
        {schema.map((schemaOptions) => (
          <div className="schema-option">

            <select
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                fontSize: '16px'
              }}
              onChange={(e) => handleAddSchema(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Add schema to segment
              </option>
              {schemaOptions.map((schemaOption) => (
                <option value={schemaOption.value}>
                  {schemaOption.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <a href="#" onClick={saveSegment}>
          +Add new schema
        </a>
      </div>
      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px'
        }}

        onClick={savedatahandler}>Send the Segment</button>


<button  onClick={clearhandler}
    className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded"
>
    Cancel
</button>

    </div>
  );
}

export default App;

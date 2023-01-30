import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function BullsCows() {
  const [enterName, setEnterName] = useState(""); //input box to enter name
  const [name, setName] = useState(""); //input box to enter number
  const [updated] = useState([]);  //store input values in updated state
  let max = 9999;
  let min = 1000;
  const [defaultValue, setDefaultValue] = useState(null);
  const [cows, setCows] = useState(1);
  const [bulls, setBulls] = useState(1);
  const [cowsScore, setCowsScore] = useState([]);
  const [bullsScore, setBullsScore] = useState([]);
  const [show, setShow] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showScore, setShowScore] = useState();
  const [attempts, setAttempts] = useState(1);
  const [books, setBooks] = useState(
    localStorage.getItem("books")
      ? [...JSON.parse(localStorage.getItem("books"))]
      : []
  );


  useEffect(() => {
    setDefaultValue(callDefault());
  },[])

  function callDefault(){
        return shuffle( "0123456789".split('') ).join('').substring(0,4);
      }
      
      function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }
  //data in local Storage
  function AddObj() {
    let book = {
      attempts: attempts,
      name: enterName,
      attempts: attempts,
    };
    setBooks([...books, book]);
    //check condition if user already exits
    let books1 = JSON.parse(localStorage.getItem("books")) ?? [];
    if(attempts && name && attempts){
      let item = {
        attempts: attempts,
        name: enterName,
        attempts: attempts,
      };
      if(books1.includes(item)){
        console.log("user already exists")
      }else
      books1?.push(item);
      localStorage.setItem("books", JSON.stringify(books1)); 
    }
      console.log("books", books1);
  }

  
  function ScoreCows() {
    let result = 0;
    for (var j = 0; j < defaultValue.length; j++) {
      if (
        name.includes(defaultValue[j]) &&
        j !== name.indexOf(defaultValue[j])
      ) {
        result += 1;
      }
    }
    name && cowsScore.push({ name: name, score: result });
    setName("");
    console.log(result);
  }



  function ScoreBulls() {
    let result = 0;
    let a = name.split("");
    let b = defaultValue.split("");
    for (var j = 0; j < defaultValue.length; j++) {
      if (a[j] == b[j]) {
        a[j] = "";
        b[j] = "";
        result++;
      }
    }
    name && bullsScore.push({ name: name, value: result });
    setName("");

    console.log(result);
  }
  
  function AttemptsCount() {
    setAttempts(attempts + 1);
  }

  function RefreshBtn() {
    window.location.reload();
  }

  return (
    <>
      <div>
        <h1>Lets Play Game</h1>
        <div className="container">
          <div className="input">
            <input
              style={{ border: "2px solid white" }}
              type="text"
              value={enterName}
              placeholder={"Enter Name"}
              onChange={(e) => setEnterName(e.target.value)}
            />
          </div>

          <input
            style={{ marginTop: "20px", border: "2px solid white" }}
            value={name}
            placeholder={"0000"}
            maxLength={4}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="item1">
          <button
            onClick={() => {
              updated.push({
                name: name,
                cows: cows,
                bulls: bulls,
              });

              if (name === defaultValue) {
                setGameWon(true);
                AddObj();
              }

              ScoreCows();
              ScoreBulls();
              AttemptsCount();
            }}
          >
            Play
          </button>
        </div>
      </div>

    
      <div className="item">
        <button onClick={RefreshBtn}>New Game</button>
      </div>

    
    
      <button
        style={{ marginLeft: "560px" }}
        className="btn"
        onClick={() => setShow(!show)}
      >
        How to Play
      </button>
      {show ? (
        <h3>
          The goal of this game is to guess a 4-digit number within the least
          number of attempts possible. A Bull means: one of the digits is
          correct, and is also at the right place. A Cow means: one of the
          digits is a right number, but not at the right place. For example,
          given that the answer is 0130, a guess of 3610 will receive 1 Bull 2
          Cows. 1 Bull is 0, 2 Cows are 1 and 3.
        </h3>
      ) : (
        ""
      )}
    
      {gameWon && <h5>Wohhoo!!! You Won The Game</h5>}

      
      <button
        style={{ fontSize: "15px", backgroundColor: " #2e2d2d3a" }}
        onClick={() => setShowScore(!showScore)}
        {...books.sort((a, b) => a.attempts - b.attempts)}
      >
        ScoreBoard
      </button>

      <div className="showScore">
        {showScore ? (
          <table>
            <tbody>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Attempts</th>
              </tr>
              {books.map((b, i) => (
                <tr key={i}>
                  <td>{b.attempts}</td>
                  <td>{b.name}</td>
                  <td>{b.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          " "
        )}
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th> Input </th>
              <th>Bulls</th>
              <th>Cows</th>
            </tr>
            <tr>
              <td>
                {updated.map((artist, index) => (
                  <h4 key={index}>{artist.name}</h4>
                ))}
              </td>
              <td>
                {bullsScore.map((item, index) => (
                  <h4 key={index}>{item.value}</h4>
                ))}
              </td>
              <td>
                {cowsScore.map((item, index) => (
                  <h4 key={index}>{item.score}</h4>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <Confetti width={"1350px"} height={"600px"} run={gameWon} />
      </div>
    </>
  );
}
export default BullsCows;

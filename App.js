import React,{useState} from "react"
import Search from "./components/search"
import axios from "axios"
import Results from "./components/results"
import Popup from "./components/Popup"
import './App.css';

function App() {
    const [state,setState]=useState({
      s:"",
      results:[],
      selected:{}
    });
    const apiurl="http://www.omdbapi.com/?apikey=dfe6d885";

    const search =(e)=>{
      if(e.key==="Enter"){
        axios(apiurl +"&s=" + state.s).then(({data})=>{
          let results=data.Search;

          setState(prevState=>{
            return {...prevState, results:results}
          })
        });
      }
    }

    const handleInput=(e)=>{
      let s=e.target.value;

      setState(prevState=>{
        return {...prevState, s:s}
      })

    }
    const openPopup=id=>{
      axios(apiurl+ "&i="+ id).then(({data})=>{
        let result=data;
        setState(prevState=>{
          return {...prevState,selected:result}
        })
      })
    }
    const closePopup =()=>{
      setState(prevState=>{
        return {...prevState, selected : {}}
      })
    }
  return (
    <div className="App">
     <header>
       <h1>Movie Page</h1>
     </header>
     <main>
       <Search handleInput={handleInput} search={search}/>
       <Results results={state.results} openPopup={openPopup}/>
       {(typeof state.selected.Title!="undefined") ? <Popup selected={state.selected} 
       closePopup={closePopup}/> : false}
     </main>
    
    </div>
  );
}

export default App;

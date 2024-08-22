import './index.css'
import Dice from "../components/Dice"
import DiceJustDots from "../components/DiceJustDots"
import SwitchButton from "../components/SwitchButton"
import { nanoid } from 'nanoid'
import React from 'react'

import Confetti from 'react-confetti'


export default function() {
  const [dice , setDice] = React.useState(allNewDice(6,1))
  const [win , setWin] = React.useState(false)
  const [rollCounter , setRollCounter] = React.useState(0)
  const [timer , setTimer] = React.useState(Date.now())
  const [bestRecord , setBestRecord] = React.useState({roll: 0, min: 0, sec: 0, timeAlone: 0, id: 0})
  //local storage high score = lshs
  const [lshs, setlshs] = React.useState({hsr: 0, hst: 0, hsm: 0}) //high score roll/time
  const [switchDice , setSwitchDice] = React.useState(false)
  



  React.useEffect( () => {
    const allheld = dice.every(die => die.isHeld)
    const oneValue = dice[0].value
    const allSameNumbe = dice.every(die => die.value === oneValue)
    if (allheld && allSameNumbe){
      setWin (true)

      console.log("you won asshole")
    }
  } ,[dice])

  // just fucking set records
  React.useEffect( () => {
      
    if (win) {
      let lastTime = 0
      win ? lastTime = Date.now() : 0
      let millis = lastTime - timer
      let secs = Math.floor (millis/1000)
      let mins = Math.floor (secs/60)
      let secs2 = secs <60 ? secs : secs%60
      
      setBestRecord(oldData => (
        {...oldData,
        roll: rollCounter,
        min: mins,
        sec: secs2,
        timeAlone: secs,
        id: oldData.id +1   
      }))
        
      }
      
  }, [win])

  //localStorage
  React.useEffect( () => {
    localStorage.setItem( JSON.stringify(bestRecord.id), JSON.stringify(bestRecord))
  }, [bestRecord])

  

  // final high score in the box
  React.useEffect( () => {

    setTimeout(() => {
      const tempHst =[]
      const tempHsr =[]
      const tempHsm =[]

      let actualMinR
      let actualMinT
      let actualMinM

      for (let i =1 ; i<=bestRecord.id ; i++){
        
        let temp = localStorage.getItem(`${i}`)
        let temp2 = temp && JSON.parse(temp)
        console.log("Delayed for 300 mili.");
        console.log(`time: ${temp2.timeAlone} roll: ${temp2.roll} id: ${temp2.id}`)
        tempHst.push(temp2.timeAlone)
        tempHsr.push(temp2.roll)
        tempHsm.push(temp2.min)
      }
      console.log(`time: ${tempHst} roll: ${tempHsr}`)
      console.log(`mintime: ${Math.min(...tempHst)} minroll: ${Math.min(...tempHsr)} minMIN: ${Math.min(...tempHsm)}`)
      actualMinR=Math.min(...tempHsr)
      actualMinT=Math.min(...tempHst)
      actualMinM=Math.min(...tempHsm)
      setlshs( {hsr: actualMinR, hst: actualMinT, hsm: actualMinM } )

    }, 0);

  }, [bestRecord])
  
  //localStorage.clear()
  




  function allNewDice(max : any , min : any) {
    const myArray = []
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    //const randomNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    for (let i = 0 ; i < 10 ; i++){
      let newNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
      myArray.push({
        value : newNumber,
        isHeld: false,
        id: nanoid(),
      })
      }
    
    return myArray
    //return randomNumber
  }


  function holdDice(id : any) {
    setDice(oldDice => oldDice.map(die => {
       return die.id === id ? {...die, isHeld : !die.isHeld} : die
    })
      
  )  
}



function fuckingNewDice(max : any , min : any) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  let newNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  return newNumber
}

  
  const diceElements = dice.map(die => <Dice 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
    
    />)
  
  const diceElementsJustDots = dice.map(die => <DiceJustDots 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
    />)  
      



  function rollHandle() {
    setDice(oldDice => oldDice.map(die => {
      return( die.isHeld === false ? { ...die, value : fuckingNewDice(6,1)} : die ) 
    }))
    if ( win === false ){
      setRollCounter(oldCount => oldCount +=1)
    }
  }

      
      


    
    // not in use not important
    function youWon(counter : any , counter2 : any) {
       const temp = []
      for( let i = 0 ; i<10 ; i++) {
        if( dice[i].isHeld === true) {
           counter +=1
           temp.push(dice[i].value)
        }
      }
      for (let i = 0 ; i < 10 ; i++){
        if (dice[i].value === temp[0]){
          counter2 +=1
        }
      }
      return counter === 10 && counter2 === 10 ? "you won!" : temp 
    }
  
  
    const RollOrWinBtn = (
      win ? <button className="btn-win" onClick={winHandle}>New Game</button> :
            <button className="btn-roll" onClick={rollHandle}>Roll</button>
    )
    
  
    function winHandle() {
      setDice(allNewDice(6, 1))
      setWin(false)
      setRollCounter(0)
      setTimer(Date.now())
    }
  
    
    
    
    
    
    
    function finishTime() {
      if (win){
        let lastTime = 0
        win ? lastTime = Date.now() : 0
        let millis = lastTime - timer

        let secs = Math.floor (millis/1000)
        let mins = Math.floor (secs/60)
        let secs2 = secs <60 ? secs : secs%60
        return (
          <h5 className='sidebar-detail'>{`${mins} MIN : ${secs2} SEC`}</h5>
        )
      }
    }
    

    // <h5 className='sidebar-detail'>{finishTime()}</h5>
    // `${mins} MIN : ${secs2} SEC`
    
  

      


    const bestRecordHandle = (
        
      <h3 className='sidebar-detail'>Best Record:<br></br>
        roll = {lshs.hsr !== Infinity ? lshs.hsr : 0}<br></br>
        time = {lshs.hsm !== Infinity ? lshs.hsm : 0 } : {lshs.hst !== Infinity ? (lshs.hst < 60 ?lshs.hst  : lshs.hst%60) : 0}
      </h3>
    )



    function diceSwitchHandle() {
      setSwitchDice(pervState => !pervState)
    }
    

    




  return (
    
    <main>


      <div className='game-base'>
        {win && <Confetti />}
        <div className="main-box">
          {/* switch Dice*/}
          <SwitchButton 
            value = {dice[0].value}
            diceSwitchHandle = {diceSwitchHandle}
            switchDice = {switchDice}
          />
          {/* switch Dice*/}
          <div className="top-box">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. 
            Click each die to 
            freeze it at its current 
            value between rolls.</p>
          </div>
          <div className='number-box'>



            {switchDice ? diceElementsJustDots : diceElements}

            




          </div>  
          {RollOrWinBtn}
        </div>
        <p className='youWon'>{youWon(0 , 0)}</p>
      </div>

        

      <div className='sidebar-container'>
       <div className='sidebar'>
         
         <h4 className='sidebar-detail'>roll counts = {rollCounter}</h4>
         {finishTime()}
         {bestRecordHandle}
         
       </div>
      </div>







      
    </main>
  )
}
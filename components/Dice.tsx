import '../src/index.css'
export default function Dice(props : any) {
    const classHeld = props.isHeld ? "btn-held" : "btn"

    function HandleDiceNumber(value : any) {
        let temp 
        if (value === 1){
            temp = (<div className='dice-dot-box'>
                <div id='dotN7'></div>
            </div>)
        }
        else if (value === 2){
            temp = (<div className='dice-dot-box'>
                <div id='dotN2'></div>
                <div id='dotN5'></div>
            </div>)
        }
        else if (value === 3){
            temp = (<div className='dice-dot-box'>
                <div id='dotN2'></div>
                <div id='dotN5'></div>
                <div id='dotN8'></div>
            </div>)
        }
        else if(value === 4){
            temp = (<div className='dice-dot-box'>
                <div id='dotN1'></div>
                <div id='dotN2'></div>
                <div id='dotN5'></div>
                <div id='dotN6'></div>
            </div>)
        }
        else if(value === 5){
            temp = (<div className='dice-dot-box'>
                <div id='dotN1'></div>
                <div id='dotN2'></div>
                <div id='dotN5'></div>
                <div id='dotN6'></div>
                <div id='dotN8'></div>
            </div>)
        }
        else if(value === 6){
            temp = (<div className='dice-dot-box'>
                <div id='dotN1'></div>
                <div id='dotN2'></div>
                <div id='dotN3'></div>
                <div id='dotN4'></div>
                <div id='dotN5'></div>
                <div id='dotN6'></div>
            </div>)
        }
        return temp
    }
    
    
    
    







    return (
        <div /*className="number-box"*/>
            
            <button className={classHeld} onClick={props.holdDice} >{props.value}
                {HandleDiceNumber(props.value)}
            </button>
        </div>
    )



}


{/* <div className='dice-dot'></div> */}
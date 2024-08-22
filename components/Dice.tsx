import '../src/index.css'
export default function Dice(props : any) {
    const classHeld = props.isHeld ? "btn-held" : "btn"









    return (
        <div /*className="number-box"*/>
            <button className={classHeld} onClick={props.holdDice} >{props.value}</button>
        </div>
    )



}
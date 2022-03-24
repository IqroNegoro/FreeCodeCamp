class Timer extends React.Component {

}

let TimerLengthControls = props => {
    return (
        <div className={props.label}>
            <p>{props.title}</p>
            <div id={props.labelInc}>
                <i class="bx bx-up-arrow-alt"></i>
            </div>
            <div id={props.labelLength}>
                {props.length}
            </div>
            <div id={props.labelDec}>
                <i class="bx bx-down-arrow-alt"></i>
            </div>
        </div>
    )
}
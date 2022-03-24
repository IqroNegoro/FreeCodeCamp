const isOperator = /[x/+-]/, endsWithOperator = /[x+-/]$/, endsWithNegativeSign = /\d[x/+-]{1}-$/

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curVal: "0",
            prevVal: "0",
            formula: "",
            currentSign: "pos",
            lastClicked: ""
        }

        this.maxDigit = this.maxDigit.bind(this)
        this.handleOperators = this.handleOperators.bind(this)
        this.handleEval = this.handleEval.bind(this)
        this.init = this.init.bind(this)
        this.handleDecimal = this.handleDecimal.bind(this)
        this.handleNumbers = this.handleNumbers.bind(this)
        this.backSpace = this.backSpace.bind(this)
        this.handleKey = this.handleKey.bind(this)
    }

    backSpace() {
        (this.state.curVal !== "0" && this.state.curVal.length !== 1) ? this.setState({
            curVal: this.state.curVal.slice(0, -1),
            formula: this.state.formula.slice(0, -1)
        }) : this.setState({
            curVal: "0",
            formula: this.state.formula.slice(0, -1)
        })
    }

    maxDigit() {
        this.setState({prevVal: this.state.curVal, curVal: "Max Digit Meet"})
        setTimeout(() => {
            this.setState({
                curVal: this.state.prevVal
            })
        }, 1000);
    }

    handleEval() {
        if (!this.state.curVal.includes("Max")) {
            let expression = this.state.formula;
            while (endsWithOperator.test(expression)) {
                expression = expression.slice(0, -1)
            }
            expression = expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "+0+0+0+0+0+0+");
            let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
            this.setState({
                curVal: answer.toString(),
                formula: expression.replace(/\*/g, '⋅').replace(/-/g, '-').replace('+0+0+0+0+0+0+', '--').replace(/(x|\/|\+)-/, '$1-').replace(/^-/, '-') + '=' + answer,
                prevVal: answer,
                evaluated: true
            })
        }
    }
    
    handleOperators(e) {
        if (!this.state.curVal.includes("Max")) {
            const value = e.value || e.target.value;
            const { formula, prevVal, evaluated } = this.state;
            this.setState({curVal: value, evaluated: false}) 
            if (evaluated) {
                this.setState({formula: prevVal + value})
            } else if (!endsWithOperator.test(formula)) {
                this.setState({
                    prevVal: formula,
                    formula: formula + value
                })
            } else if (!endsWithNegativeSign.test(formula)) {
                this.setState({
                    formula: (endsWithNegativeSign.test(formula + value) ? formula: prevVal) + value
                  });
            } else if (value !== "-") {
                this.setState({
                    formula: prevVal + value
                })
            }
        }
    }
    
    handleNumbers(e) {
        if (!this.state.curVal.includes("Max")) {
            const {formula, curVal, evaluated} = this.state
            let val = e.value || e.target.value;
            this.setState({evaluated: false})
            if (curVal.length > 21) {
                this.maxDigit()
            } else if (evaluated) {
                this.setState({
                    curVal: val,
                    formula: val !== "0" ? val : ""
                })
            } else {
                this.setState({
                    curVal: curVal === "0" || isOperator.test(curVal) ? val : curVal + val,
                    formula: curVal === "0" && val === "0" ? formula === "" ? val : formula : /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + val : formula + val
                })
            }
        }
    }

    handleKey(e) {
        document.querySelector(`[value="${e.key}"]`).classList.add("active")
        setTimeout(() => {
        document.querySelector(`[value="${e.key}"]`).classList.remove("active")
        }, 150);

        if (e.key === "Backspace") {
            this.backSpace();
        }
        if (e.key === "c") {
            this.init();
        }
        if (!this.state.curVal.includes("Max")) {
            if (this.state.curVal.length > 21) {
                this.maxDigit();
            } else {
        const list = [
            "1","2","3","4","5","6","7","8", "9", "0", ".", "+", "=", "/", "-", "x"
        ]
        if (list.indexOf(e.key) >= 0) {
            let {curVal} = this.state
            let i = list.indexOf(e.key);
            if (e.key === "=") {
                this.handleEval();
            } else if (isOperator.test(e.key)) {
                    this.handleOperators(document.querySelector(`[value="${list[i]}"]`));
            } else {
                this.handleNumbers(document.querySelector(`[value="${list[i]}"]`))
            }
        }
    }
}
}
    
    componentDidMount() {
        document.addEventListener("keyup", this.handleKey)
    }
    
    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKey)
    }
    
    handleDecimal() {
        if (this.state.evaluated) {
            this.setState({
                currentVal: '0.',
                formula: '0.',
                evaluated: false
              });
        } else if (!this.state.curVal.includes(".") && !this.state.curVal.includes("Max")) {
            this.setState({evaluated: false});
            if (this.state.curVal.length > 21) {
                this.maxDigit();
            } else if (endsWithOperator.test(this.state.formula) || (this.state.curVal === "0" && this.state.formula === "")) {
                this.setState({
                    curVal: "0.",
                    formula: this.state.formula + "0."
                })
            } else {
                this.setState({
                    curVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
                    formula: this.state.formula + '.'
                  });
            }
        }
    }


    init() {
        this.setState({
            curVal: "0",
            prevVal: "0",
            formula: "",
            currentSign: "pos",
            lastClicked: ""
        })
    }

    render() {
        return (
            <div className="calculator">
                <Formula formula={this.state.formula.replace(/x/g, "*")}/>
                <Output display={this.state.curVal} />
                <Buttons
                init={this.init}
                decimal={this.handleDecimal}
                eval={this.handleEval}
                number={this.handleNumbers}
                operator={this.handleOperators}
                bcsp={this.backSpace}
                />
            </div>
        )
    }
}

let Buttons = props => {
    return (
        <React.Fragment>
            <button className="clear" id="clear" value="c" onClick={props.init}> AC </button>
            <button className="bcsp" id="bcsp" value="Backspace" onClick={props.bcsp}><i className="bx bxs-tag-x"></i></button>
            <button className="divide" id="divide" value="/" onClick={props.operator}>/</button>
            <button className="multiply" id="multiply" value="x" onClick={props.operator}>x</button>
            <button className="one" id="one" value="1" onClick={props.number}>1</button>
            <button className="two" id="two" value="2" onClick={props.number}>2</button>
            <button className="three" id="three" value="3" onClick={props.number}>3</button>
            <button className="substract" id="subtract" value="-" onClick={props.operator}>-</button>
            <button className="four" id="four" value="4" onClick={props.number}>4</button>
            <button className="five" id="five" value="5" onClick={props.number}>5</button>
            <button className="six" id="six" value="6" onClick={props.number}>6</button>
            <button className="add" id="add" value="+" onClick={props.operator}>+</button>
            <button className="seven" id="seven" value="7" onClick={props.number}>7</button>
            <button className="eight" id="eight" value="8" onClick={props.number}>8</button>
            <button className="nine" id="nine" value="9" onClick={props.number}>9</button>
            <button className="zero" id="zero" value="0" onClick={props.number}>0</button>
            <button className="equals" id="equals" value="=" onClick={props.eval}>=</button>
            <button className="decimal" id="decimal" value="." onClick={props.decimal}>.</button>
        </React.Fragment>
    )
}

let Output = props => <div id="display" className="display">{props.display}</div>

let Formula = props => <div className="previous">{props.formula}</div>

ReactDOM.render(<Calculator />, document.getElementById("App"))
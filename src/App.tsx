import React from 'react';
import * as _ from 'lodash';
import {Field} from "./lib/ModelInterface";
import {checkValid, createInitialField, createProblem, Invalid} from "./lib/util";
import {Area} from "./components/Area";
import {AppContext} from "./AppContext";

type Props = {};
type State = {
  field: Field;
  problem: Field;
  invalids: Invalid[];
}

class App extends React.Component<Props, State> {
  state: State = {
    field: [],
    problem: [],
    invalids: [],
  };

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckValid = this.handleCheckValid.bind(this);
    this.handleInitValid = this.handleInitValid.bind(this);
  }

  componentDidMount(): void {
    const field = createInitialField();
    this.setState({
      field,
      problem: createProblem(1, 2, field),
    })
  }

  handleChange(x: number, y: number, value?: number) {
    const newField = this.state.field.slice();

    const targetIndex = _.findIndex(newField, (cell) => {
      return cell.x === x && cell.y === y;
    });

    newField[targetIndex].value = value;

    this.setState({
      field: newField,
    })
  }

  handleCheckValid() {
    const invalids = checkValid(this.state.field);
    this.setState({
      invalids
    });

    if (invalids.length === 0) {
      alert('Complete!!');
    }
  }

  handleInitValid() {
    this.setState({
      invalids: []
    })
  }

  render() {
    const {field, problem, invalids} = this.state;

    return (
      <AppContext.Provider
        value={{
          field,
          problem,
          invalids,
          handleChange: this.handleChange
        }}
      >
        <div className="container">
          <h1 className="title">Sudoku</h1>
          <div className="sudoku">
            {_.range(1, 10).map((num, i) => {
              const cells = _.filter(problem, ((cell) => {
                return cell.area === num;
              }));

              return (
                <Area
                  key={i}
                  areaNum={num}
                  cells={cells}
                />
              )
            })}
          </div>
          <div className="buttons are-medium is-centered">
            <button className="button is-success" onClick={this.handleCheckValid}>check</button>
            <button className="button " onClick={this.handleInitValid}>init</button>
          </div>
        </div>
        {/*
        <hr/>
        <code>
          {JSON.stringify(this.state.field)}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcArea(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcX(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(calcY(this.state.field))}
        </code>
        <hr/>
        <code>
          {JSON.stringify(checkValid(this.state.field))}
        </code>
        */}
      </AppContext.Provider>
    );
  }
}

export default App;

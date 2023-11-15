import { Component } from "react";

export class StepsResults extends Component {
  render() {
    const { results, handleClick } = this.props;
    return (
      <>
        {results.map((el, index) => (
          <div className="results" key={index}>
            <div className="results__item">{el.date}</div>
            <div className="results__item">{el.count}</div>
            <div className="results__item action">
              <div className="edit"></div>
              <div className="delete" onClick={handleClick}></div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

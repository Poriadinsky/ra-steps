import { Component } from "react";
import { StepsResults } from "./StepsResults";
import moment from "moment";

export class Steps extends Component {
  constructor() {
    super();
    this.results = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      results: this.results,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let inputDate = document.getElementById("date").value;
    let inputCount = Number(document.getElementById("count").value);
    let arrOfDate = [];
    this.results.forEach((el) => {
      arrOfDate.push(el.date);
    });
    if (!arrOfDate.includes(inputDate)) {
      this.results.unshift({ date: inputDate, count: inputCount });
      this.results.sort((a, b) => moment(b.date) - moment(a.date));
      this.setState({
        results: this.results,
      });
    } else {
      let index = arrOfDate.indexOf(inputDate);
      this.results[index].count += inputCount;
      this.results.sort((a, b) => moment(b.date) - moment(a.date));
      this.setState({
        results: this.results,
      });
    }
  }

  handleClick(e) {
    let target = e.target;
    if (target.classList.contains("delete")) {
      let removeDate = target
        .closest(".results")
        .querySelector(".results__item").textContent;

      let arrOfDate = [];
      this.results.forEach((el) => {
        arrOfDate.push(el.date);
      });

      let index = arrOfDate.indexOf(removeDate);

      this.results.splice(index, 1);

      this.setState({
        results: this.results,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <form className="header" onSubmit={this.handleSubmit}>
          <div className="header__item">
            <label htmlFor="date">Дата</label>
            <input id="date" name="date" className="input" type="date" />
          </div>
          <div className="header__item">
            <label htmlFor="count">Пройдено км</label>
            <input id="count" name="count" className="input" />
          </div>
          <button type="submit" className="submit">
            OK
          </button>
        </form>
        <div className="results__header">
          <div className="results__header-item">Дата</div>
          <div className="results__header-item">Пройдено км</div>
          <div className="results__header-item">Действия</div>
        </div>
        <StepsResults
          results={this.state.results}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

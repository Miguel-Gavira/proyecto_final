import React from "react";

interface IProps {}

const Datepicker: React.FC<IProps> = props => {
  const [day, setDay] = React.useState(new Date().getUTCDate());
  const [month, setMonth] = React.useState(new Date().getUTCMonth());
  const [year, setYear] = React.useState(new Date().getUTCFullYear());

  const add = (n: number) => {
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month);
    date.setUTCDate(day + n);
    setDay(date.getUTCDate());
    setMonth(date.getUTCMonth());
    setYear(date.getUTCFullYear());
  };

  const sub = (n: number) => {
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month);
    date.setUTCDate(day - n);
    setDay(date.getUTCDate());
    setMonth(date.getUTCMonth());
    setYear(date.getUTCFullYear());
  };

  const days = []

  for(let i = 0; 8 > i; i++){
    let otherDay = new Date().setUTCDate(day + i);
    let day2 = new Date(otherDay).getUTCDate();
    days.push(day2);
  }

  return (
    <div>
      <div>
        <h2>{year}</h2>
        <h2>{month}</h2>
      </div>
      <div className="row">
        <button onClick={() => add(8)}>+</button>
        <ul>
            <li>{days[0]}</li>
            <li>{days[1]}</li>
            <li>{days[2]}</li>
            <li>{days[3]}</li>
            <li>{days[4]}</li>
            <li>{days[5]}</li>
            <li>{days[6]}</li>
            <li>{days[7]}</li>
        </ul>
        <button onClick={() => sub(8)}>-</button>
      </div>
    </div>
  );
};

export default Datepicker;

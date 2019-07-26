import React from "react";

interface IProps {}

const Datepicker: React.FC<IProps> = props => {
  const [day, setDay] = React.useState(new Date().getUTCDate());
  const [month, setMonth] = React.useState(new Date().getUTCMonth());
  const [year, setYear] = React.useState(new Date().getUTCFullYear());

  const allMonth = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const currentMonth = allMonth[month];

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

  const days = [];

  for (let i = 0; 8 > i; i++) {
    let otherDay = new Date().setUTCDate(day + i);
    let day2 = new Date(otherDay).getUTCDate();
    days.push(day2);
  }

  return (
    <div>
      <div>
        <h2>{year}</h2>
        <h2>{currentMonth}</h2>
      </div>
      <div className="col s12">
        <ul className="pagination">
          <li onClick={() => sub(8)}>
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[0]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[1]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[2]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[3]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[4]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[5]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[6]}</a>
          </li>
          <li className="waves-effect">
            <a href="#!">{days[7]}</a>
          </li>
          <li onClick={() => add(8)}>
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Datepicker;

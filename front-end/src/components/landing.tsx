import React from "react";
import Navbar from "./navbar";
import Datepicker from "./datepicker";
import { Route } from "react-router-dom";
const materialize = require("react-materialize");

interface IProps {}

const Landing: React.FC<IProps> = props => {
  return (
    <div>
      <Route component={Navbar} />
      <div>
        <materialize.Parallax
          image={
            <img
              src="https://mybarbershopbroward.files.wordpress.com/2016/09/barber-wallpaper-23.jpg"
              alt="fondo"
            />
          }
        />
        <div className="section white z-depth-5">
          <materialize.Modal
            header="Reserva tu cita"
            trigger={
              <a className="waves-effect waves-light btn">Reservar cita</a>
            }
            actions={
              <materialize.Button waves="green" modal="close" flat>
                Cerrar
              </materialize.Button>
            }
          >
            <Datepicker />
          </materialize.Modal>

          <div className="row container">
            <h2 className="header">Reserva tu cita</h2>
            <p className="grey-text text-darken-3 lighten-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              eos asperiores nesciunt illum, voluptatum, ratione sunt sed sint
              eius, neque optio obcaecati! Distinctio iste tempora aut suscipit
              perferendis unde quos illo omnis debitis, in, eaque libero numquam
              fugiat dolore nesciunt eius velit quisquam similique explicabo vel
              id impedit, voluptates delectus. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit.
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Illum, distinctio voluptas blanditiis nostrum culpa libero
              temporibus, dicta hic saepe et facilis maxime delectus quidem.
              Sequi perferendis at explicabo rerum dolorum quia soluta quae
              ullam, dicta dolor et nobis enim magni placeat. Dolorem odio
              itaque totam accusantium vero reprehenderit maxime quo.
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Illum, distinctio voluptas blanditiis nostrum culpa libero
              temporibus, dicta hic saepe et facilis maxime delectus quidem.
              Sequi perferendis at explicabo rerum dolorum quia soluta quae
              ullam, dicta dolor et nobis enim magni placeat. Dolorem odio
              itaque totam accusantium vero reprehenderit maxime quo.
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Illum, distinctio voluptas blanditiis nostrum culpa libero
              temporibus, dicta hic saepe et facilis maxime delectus quidem.
              Sequi perferendis at explicabo rerum dolorum quia soluta quae
              ullam, dicta dolor et nobis enim magni placeat. Dolorem odio
              itaque totam accusantium vero reprehenderit maxime quo.
            </p>
          </div>
        </div>
        <materialize.Parallax
          image={
            <img
              src="https://hairstylehub.com/wp-content/uploads/2017/07/best-profesional-barber-hair-clippers.jpg"
              alt="fondo"
            />
          }
        />
      </div>
    </div>
  );
};

export default Landing;

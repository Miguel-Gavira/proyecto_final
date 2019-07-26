import React from "react";
const materialize = require("react-materialize");

interface IProps {}

const Login: React.FC<IProps> = props => {
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(event.target.value);
  };

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const submit = () => {
    fetch("http://localhost:8080/api/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword
      })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          sessionStorage.setItem("token", token);
          //   props.setToken(token);
          //   const decode = jwt.decode(token);
          //   if (decode !== null && typeof decode !== "string") {
          //     props.setUsername(decode.username);
          //     props.setEmail(decode.email);
          //     props.setId(decode.id);
          //   }
        });
      } else {
        setErrorLogin("Usuario o contraseña incorrecta");
      }
    });
  };

  return (
    <div>
      <materialize.Dropdown 
        trigger={<a className="waves-effect waves-light btn">Login</a>}
        className="LoginCard"
        options={{closeOnClick: false, constrainWidth: false}}
        // actions={
        //   <materialize.Button waves="green" modal="close" flat>
        //     Cerrar
        //   </materialize.Button>
        // }
      >
        <div className="row margin">
          <div className="col s12 m12 l12 center">
            <img
              src="https://png.pngtree.com/svg/20161113/ef1b24279e.png"
              alt="logo"
              className="responsive-img circle"
              width="100px"
            />
          </div>
        </div>

        <div className="col s12 m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input
              onChange={updateInputUsername}
              type="text"
              name="username"
              id="username"
            />
            <label>Username</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              onChange={updateInputPassword}
              type="password"
              name="password"
              id="password"
            />
            <label>Password</label>
          </div>
        </div>

        <div className="center">
          <h3>{errorLogin}</h3>
          <button onClick={submit} className="btn waves-effect waves-light ">
            Login
          </button>
        </div>

        <div className="">
          <a href="" className="left">
            ¿Nuevo por aquí? Registate
          </a>
          <a href="" className="right ">
            Recordar contraseña
          </a>
        </div>
      </materialize.Dropdown >
    </div>
  );
};

export default Login;

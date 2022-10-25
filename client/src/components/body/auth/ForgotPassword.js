import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleForgotPassword = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, err: "Email Inválido.", success: "" });
    }
    try {
      const res = await axios.post("/user/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container">
      <Link to={"/login"}>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          title="Regresar"
          className="return"
        />
      </Link>

      <div className="fg_pass">
        <div className="row shadow-lg p-3 rounded">
          <div className="mb-3">
            <h2 className="fw-bold fs-1 text-center pb-3 border-bottom">
              ¿Olvidaste Tu Contraseña?
            </h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
          </div>

          <div>
            <label className="fs-5 form-label" htmlFor="email">
              Ingresa tu correo electrónico:
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            ></input>
          </div>

          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-dark" onClick={handleForgotPassword}>
              Verifica tu correo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

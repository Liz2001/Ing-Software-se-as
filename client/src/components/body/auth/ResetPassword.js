import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async () => {
    if (isLength(password)) {
      return setData({
        ...data,
        err: "La contraseña es muy corta. Debe ser mayor o igual a 8 caracteres.",
        sucess: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setData({
        ...data,
        err: "Las contraseñas no coinciden.",
        success: "",
      });
    }
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
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
            <h2 className="fw-bold fs-1 text-center">
              Reestablece Tu Contraseña
            </h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
          </div>

          <div className="mb-3">
            <label className="fs-5 form-label" htmlFor="password">
              Ingresa tu nueva contraseña:
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChangeInput}
            ></input>
          </div>

          <div className="mb-3">
            <label className="fs-5 form-label" htmlFor="cf_password">
              Confirma tu nueva contraseña:
            </label>
            <input
              className="form-control"
              type="password"
              name="cf_password"
              id="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
            ></input>
          </div>

          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-dark" onClick={handleResetPassword}>
              Reestablecer contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

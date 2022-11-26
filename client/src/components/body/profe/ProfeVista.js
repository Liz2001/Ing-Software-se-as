import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classs from "../../images/classs.jpg";

function ProfeVista() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const { user, isAdmin } = auth;
  const dispatch = useDispatch();
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  return (
    <div className="container">
      <h1 className="fs-1 fw-bold mt-5" style={{ color: "teal" }}>
        PROGRESO DE LOS ALUMNOS
      </h1>
      <p
        className="fs-5 border-bottom pb-4 mt-3"
        style={{ textAlign: "justify" }}
      >
        Bienvenido, profesor. A continuación, se muestran todos los estudiantes
        con el procentaje de completación del curso.
      </p>
      <div className="row">
        <div className="col-8">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>E-mail</th>
                <th>Progreso</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (user.role == 0) {
                  /* nombre, email y progreso */
                  return (
                    <tr>
                      <td>{user.name + " "}</td>
                      <td>{user.email + " "}</td>
                      <td>{user.progress + "%"}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <img
            className="img-fluid rounded float-end"
            src={classs}
            alt="Classroom"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default ProfeVista;

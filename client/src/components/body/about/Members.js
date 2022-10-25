import React from "react";

function Members() {
  return (
    <div className="container col-2 mt-4">
      <p className="fs-5 fw-semibold text-center border-bottom pb-2">GRUPO 6</p>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Estefani Ramos</td>
            <td>Product Owner y Jefe del Proyecto</td>
          </tr>
          <tr>
            <td>Angel Cuya</td>
            <td>Scrum Master</td>
          </tr>
          <tr>
            <td>Kevin Garcia</td>
            <td>Product Owner</td>
          </tr>
          <tr>
            <td>Sebastian Guevara</td>
            <td>Desarrollador y Tester</td>
          </tr>
          <tr>
            <td>Sebastian Bañon</td>
            <td>Desarrollador</td>
          </tr>
          <tr>
            <td>Francisco Diaz</td>
            <td>Desarrollador</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Members;

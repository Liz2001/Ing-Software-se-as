import React from "react";

function Members() {
  return (
    <div className="container col-6 mt-4">
      <p className="fs-5 fw-semibold text-center border-bottom pb-2">MIEMBROS</p>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Estefani Lizbett Ramos Mendoza</td>
            <td>Product Owner y Jefe del Proyecto</td>
          </tr>
          <tr>
            <td>Angel Oscar Cuya Sanchez</td>
            <td>Scrum Master</td>
          </tr>
          <tr>
            <td>Kevin Arnold Garcia Perez</td>
            <td>Product Owner</td>
          </tr>
          <tr>
            <td>Sebastian Alfredo Guevara Vásquez</td>
            <td>Desarrollador y Tester</td>
          </tr>
          <tr>
            <td>Sebastian Bañón Félix</td>
            <td>Desarrollador</td>
          </tr>
          <tr>
            <td>Francisco Manuel Díaz Delgado</td>
            <td>Desarrollador</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Members;

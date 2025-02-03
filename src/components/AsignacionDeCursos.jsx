import React, { useState } from "react";
import cursos from "../datos/CursosDisponibles";

function SeleccionarCurso() {
  const [selectedCourses, setSelectedCourses] = useState([]);

  function handleSelect(curso) {
    if (!selectedCourses.find((c) => c.codigo === curso.codigo)) {
      setSelectedCourses([...selectedCourses, curso]);
      alert(`Curso ${curso.nombre} seleccionado`);
    } else {
      alert("Este curso ya ha sido seleccionado");
    }
  }

  return (
    <div>
      <h1>Seleccionar Curso</h1>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.codigo}>
            <p>Nombre: {curso.nombre}</p>
            <p>Código: {curso.codigo}</p>
            <p>Créditos: {curso.creditos}</p>
            <button onClick={() => handleSelect(curso)}>Seleccionar</button>
          </li>
        ))}
      </ul>

      <h2>Cursos Seleccionados:</h2>
      <ul>
        {selectedCourses.map((curso) => (
          <li key={curso.codigo}>{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default SeleccionarCurso;

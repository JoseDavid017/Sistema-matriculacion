import React, { useState } from "react";
import estudiantes from "../datos/Estudiantes";
import CourseCard from "./Cursos";

function InicioSesion() {
  const [idEstudiante, setIdEstudiante] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  function Login() {
    const estudiante = estudiantes.find((est) => est.id.toString() === idEstudiante);
    if (estudiante) {
      setAutenticado(true);
    } else {
      alert("Usuario Incorrecto, intenta nuevamente");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {!autenticado ? (
        <div className="bg-white p-6 rounded shadow-md">
          <img src="https://www.uac.edu.co/descargas_uac/identidad_institucional2024/LOGO_AUTONOMA_UAC.png" alt="" width={"70px"} />
          <h2 className="text-2xl font-bold mb-4">Ingrese a tu cuenta</h2>
          <label htmlFor="IdEstudiante" className="block mb-2">
            Ingresa tu ID:
          </label>
          <input
            type="text"
            id="IdEstudiante"
            className="border p-2 rounded w-full mb-4"
            value={idEstudiante}
            onChange={(e) => setIdEstudiante(e.target.value)}
            required
            placeholder="Ingrese tu Id"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={Login}
          >
            Ingresar
          </button>
        </div>
      ) : (
        <CourseCard />
      )}
    </div>
  );
}

export default InicioSesion;

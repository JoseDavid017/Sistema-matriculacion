import React, { useState, useEffect } from "react";
import cursos from "../datos/CursosDisponibles";
import estudiantes from '../datos/Estudiantes';

const estudiante = estudiantes[0];
const estudianteMatriculado = estudiante.matriculado;
const maxCredits = estudiante.creditosPermitidos;
const semestreActual = estudiante.semestre;

function CourseCard() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [updatedCursos, setUpdatedCursos] = useState(cursos);
  const [matriculaConfirmada, setMatriculaConfirmada] = useState(false);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("selectedCourses"));
    const storedCredits = localStorage.getItem("totalCredits");
    const storedMatriculaStatus = localStorage.getItem("matriculaConfirmada");

    if (storedCourses && Array.isArray(storedCourses)) {
      setSelectedCourses(storedCourses);
      setTotalCredits(Number(storedCredits));
    }

    if (storedMatriculaStatus === "true") {
      setMatriculaConfirmada(true);
    }
  }, []);

  useEffect(() => {
    if (matriculaConfirmada) {
      localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
      localStorage.setItem("totalCredits", totalCredits);
      localStorage.setItem("matriculaConfirmada", matriculaConfirmada.toString());
    }
  }, [selectedCourses, totalCredits, matriculaConfirmada]);

  function handleSelect(curso) {
    if (!estudianteMatriculado) {
      alert("No puedes seleccionar cursos. No estás matriculado en el periodo académico.");
      return;
    }

    if (curso.semestre !== semestreActual) {
      alert(`El curso ${curso.nombre} no pertenece al semestre actual.`);
      return;
    }

    if (curso.limiteCupos - curso.matriculados <= 0) {
      alert(`El curso ${curso.nombre} no tiene cupos disponibles.`);
      return;
    }

    if (totalCredits + curso.creditos > maxCredits) {
      alert("No puedes seleccionar más créditos del límite permitido.");
      return;
    }

    if (!selectedCourses.find((c) => c.codigo === curso.codigo)) {
      setSelectedCourses([...selectedCourses, curso]);
      setTotalCredits(totalCredits + curso.creditos);
      alert(`Curso ${curso.nombre} seleccionado`);

      setUpdatedCursos(prevCursos => prevCursos.map(c => {
        if (c.codigo === curso.codigo) {
          return { ...c, matriculados: c.matriculados + 1 };
        }
        return c;
      }));
    } else {
      alert("Este curso ya ha sido seleccionado");
    }
  }

  function handleRemove(codigo) {
    if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      const curso = selectedCourses.find((c) => c.codigo === codigo);
      setSelectedCourses(selectedCourses.filter((c) => c.codigo !== codigo));
      setTotalCredits(totalCredits - curso.creditos);

      setUpdatedCursos(prevCursos => prevCursos.map(c => {
        if (c.codigo === curso.codigo) {
          return { ...c, matriculados: c.matriculados - 1 };
        }
        return c;
      }));
    }
  }

  function ConfirmarMatricula() {
    setMatriculaConfirmada(true);
  }

  function RegresarSeleccion() {
    setMatriculaConfirmada(false);
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center dark:bg-gray-700 dark:text-gray-200 p-10 rounded-lg">
      <h1 className="font-bold text-3xl mb-6">Bienvenido, {estudiante.nombre}</h1>
      <p className="text-xl mb-4">Semestre: {estudiante.semestre}</p>
      <p className="text-lg mb-6">Créditos Disponibles: {maxCredits - totalCredits}</p>

      {!matriculaConfirmada ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
            {updatedCursos.map((curso) => (
              <div 
                key={curso.id} 
                className="bg-white p-6 rounded-2xl shadow-lg dark:bg-slate-800 transform hover:scale-105 transition duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {curso.nombre}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Código: {curso.codigo}</p>
                <p className="text-gray-600 dark:text-gray-300">Créditos: {curso.creditos}</p>
                <p className={`mt-2 text-sm font-semibold ${curso.limiteCupos - curso.matriculados > 0 ? 'text-green-600' : 'text-red-600'}`} >
                  Cupos disponibles: {curso.limiteCupos - curso.matriculados}
                </p>
                <p className="mt-2 text-sm font-semibold">Semestre: {curso.semestre}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleSelect(curso)}
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold mt-8">
            Créditos Seleccionados: {totalCredits} / {maxCredits}
          </h2>

          <h2 className="font-bold text-3xl mt-10">Cursos Seleccionados:</h2>
          <table className="mt-4 w-full max-w-4xl border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Código</th>
                <th className="border border-gray-300 px-4 py-2">Créditos</th>
                <th className="border border-gray-300 px-4 py-2">Semestre</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map((curso) => (
                <tr key={curso.codigo} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{curso.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{curso.codigo}</td>
                  <td className="border border-gray-300 px-4 py-2">{curso.creditos}</td>
                  <td className="border border-gray-300 px-4 py-2">{curso.semestre}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleRemove(curso.codigo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            type="submit"
            className="m-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={ConfirmarMatricula}
          >
            Confirmar Matricula
          </button>
        </>
      ) : (
        <div className="bg-gray-500 p-6 rounded-lg">
          <h2 className="font-bold text-3xl">Matrícula Confirmada</h2>
          <p className="mt-4">Has confirmado tu matrícula con éxito.</p>
          <h3 className="mt-6 text-xl font-semibold">Cursos Seleccionados:</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-600">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Código</th>
                <th className="border border-gray-300 px-4 py-2">Créditos</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map((curso) => (
                <tr key={curso.codigo} className="text-center hover:bg-gray-400">
                  <td className="border border-gray-300 px-4 py-2">{curso.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{curso.codigo}</td>
                  <td className="border border-gray-300 px-4 py-2">{curso.creditos}</td>
                </tr>
              ))}

              <tr className="font-semibold">
                <td className="border border-gray-300 px-4 py-2" colSpan="2">Total de Créditos</td>
                <td className="border border-gray-300 px-4 py-2">{totalCredits}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={RegresarSeleccion}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseCard;

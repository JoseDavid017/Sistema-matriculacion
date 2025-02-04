# Aplicación de Selección de Cursos

## Descripción
Esta aplicación permite a los estudiantes seleccionar cursos de un catálogo disponible, gestionar su matrícula y confirmar la selección de cursos. La aplicación está diseñada para ofrecer una experiencia de usuario intuitiva en dispositivos móviles y de escritorio.

---

## Características
- Visualización de cursos disponibles con información detallada (nombre, código, créditos, semestre y cupos disponibles).
- Selección y eliminación de cursos.
- Validaciones para:
  - Límite de créditos permitidos.
  - Disponibilidad de cupos.
  - Correspondencia del curso con el semestre actual.
- Confirmación de matrícula con persistencia de datos en `localStorage`.
- Interfaz responsiva para adaptarse a dispositivos móviles, tabletas y escritorios.

---

## Tecnologías Utilizadas
- **React**: Framework de JavaScript para la interfaz de usuario.
- **Tailwind CSS**: Biblioteca de utilidades CSS para el diseño responsivo.
- **LocalStorage**: Persistencia de datos en el navegador.

---

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/JoseDavid017/Sistema-matriculacion
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd sistema-matriculacion
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta la aplicación:
   ```bash
   npm start
   ```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Estructura del Proyecto
```
src/
├── componentes/
│   └── CourseCard.jsx     # Componente principal para la gestión de cursos
├── datos/
│   ├── CursosDisponibles.js # Datos de los cursos disponibles
│   └── Estudiantes.js       # Datos de los estudiantes
└── App.js                  # Componente principal de la aplicación
```

---

## Uso
1. La aplicación muestra una lista de cursos disponibles.
2. Haz clic en el botón **Seleccionar** para agregar un curso.
3. Los créditos seleccionados se actualizarán dinámicamente.
4. Puedes eliminar cursos seleccionados desde la tabla de "Cursos Seleccionados".
5. Haz clic en **Confirmar Matrícula** para guardar la selección.

### Validaciones
- Si intentas seleccionar un curso de otro semestre o sin cupos disponibles, la aplicación mostrará un mensaje de error.
- No se permite superar el límite de créditos permitidos.

---

## Mejoras Futuras
- Autenticación de usuarios.
- Integración con una base de datos.
- Filtro y búsqueda de cursos.
- Notificaciones personalizadas.

---

## Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:
1. Haz un fork del proyecto.
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## Licencia
Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo `LICENSE` para más información.

---

## Autor
Desarrollado por Jose Ariza.


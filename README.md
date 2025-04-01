  # RockRequests

  ## Tecnologías utilizadas

  Este proyecto utiliza las siguientes tecnologías:

  - React
  - JavaScript
  - MongoDB
  - Node.js
  - Express
  - AWS S3
  - AWS

  ## Flujo de trabajo con Git

  El desarrollo del proyecto se gestiona con Git siguiendo la estrategia de ramas que se describe a continuación.

  ### Ramas principales:

  - main → Rama principal que contiene la versión final y estable del proyecto.
  - develop → Rama de desarrollo donde se integran nuevas características antes de fusionarse con main.

  ### Creación de nuevas ramas

  Para trabajar en una nueva funcionalidad o corrección de errores, sigue estos pasos:

  1. Cambiar a la rama develop:
     sh
     git checkout develop
     
  2. Traer los últimos cambios de develop:
     sh
     git pull
     
  3. Crear una nueva rama basada en develop:
     sh
     git checkout -b feat/RR-0001
     
     (Sustituye RR-0001 por el identificador adecuado para tu tarea)

  ### Creación de una rama de release

  Para generar una versión lista para producción:

  1. Asegurarse de estar en develop:
     sh
     git checkout develop
     
  2. Traer los últimos cambios:
     sh
     git pull
     
  3. Cambiar a la rama main y actualizarla:
     sh
     git checkout main
     git pull
     
  4. Crear la nueva rama de release:
     sh
     git checkout -b release/RR-0001
     

  ### Convenciones para nombres de ramas

  Las ramas deben seguir la siguiente convención:

  - feat/NOMBRE → Para nuevas características
  - fix/NOMBRE → Para corrección de errores
  - refactor/NOMBRE → Para mejoras sin cambiar funcionalidad
  - hotfix/NOMBRE → Para arreglos urgentes en producción
  - chore/NOMBRE → Para cambios en versiones o mantenimiento
  - release/NOMBRE → Para cambios finales en main

  ### Integración de cambios mediante Cherry-Pick

  Para llevar cambios específicos de develop a release:

  1. Identificar el hash del commit que se quiere trasladar.
  2. Aplicar el cherry-pick:
     sh
     git cherry-pick <hash>
     

  ### Confirmaciones y Pull Requests

  1. Hacer cambios en tu rama y añadirlos al repositorio:
     sh
     git add .
     git commit -m "feat: descripción corta de la funcionalidad"
     
  2. Subir la rama al repositorio remoto:
     sh
     git push origin feat/RR-0001
     
  3. Crear un Pull Request en GitHub/Merge Request en GitLab para fusionar la rama en develop.

  ### Integración a develop y main

  - Las ramas se fusionan en develop después de ser revisadas.
  - Una vez que develop está estable, se fusiona en main para una nueva versión.

  ---

  ### ¡Gracias por contribuir a RockRequests! 🚀


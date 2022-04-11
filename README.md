## AGEND FRONTEND 

:wave: Soy Raquel Moya.</br>


---

- [Sobre el proyecto](#about)   

- [Instrucciones](#instructions)

- [Features](#features)

- [Tecnologías](#tools)

- [Developers](#developers)

---
<a name="about"></a>
## Sobre el proyecto

Este proyecto consiste en replicar la parte Frontend de una adenda personal trabajando sobre el Backend que podéis encontrar en el siguiente enlace :
https://github.com/RaquelMoya/agenda

A continuación encontraréis detallados cada una de las funcionalidades de este proyecto.

<a name="instructions"></a>
## Instrucciones 🔧

Dado que hemos deployado el Frontend en AWS, y el backend junto con la BBDD en Heroku, podemos acceder a la app de forma remota con el siguiente enlace:

=============>https://master.d26c8aov44o1cy.amplifyapp.com<===================

Si por el contrario, queremos acceder a la app de manera local, deberíamos seguir las instrucciones de instalación local del backend plasmadas en el readme del proyecto en https://github.com/RaquelMoya/agenda y, posteriormente, clonar este repositorio localmente.
una vez clonado, deberemos instalar las dependencias no incluidas por el archivo .gitignore:

### `npm i`

Posteriormente, deberíamos modificar la raíz existente en cada endpoint en Components y Containers, para trabajar a nivel local. Deberemos modificar todas las raices de los endponts a http://127.0.0.1:8000/ en lugar de https://rocky-retreat-20214.herokuapp.com/

### `npm run dev` ó `npm start`

y ya podríamos acceder a la app sin utilizar el deploy. 

A continuación, detallamos todas las funcionalidades que podemos encontrar en la app.

<a name="features"></a>
## Features

Cuando iniciamos la app, nos lleva a la vista Welcome, donde podemos hacer login, o registrarnos. En la barra superior de la pantalla, encontraremos tambien botones de acceso a registro y login. </br>
<img src="src/img/welcome.jpg" width="1500">

Para registrarnos, debemos clickar sobre register y nos redirigirá a la vista de registro, donde podremos introducir nuestros datos para crear un usuario. 

<img src="src/img/register.jpg" width="1500">

Una vez nos hemos registrado, nos redirigirá a la vista de Login, donde deberemos introducir nuestro email y nuestro password con los que nos hemos registrado previamente. 

<img src="src/img/login.jpg" width="1500">

Al loguearnos, nos redirigirá a la vista de Profile, donde podremos modificar nuestros datos de usuario o acceder a las diferentes vistas de tareas (tasks), notas (notes) o contactos (contacts). También veremos como en la barra superior aparece un botón cde profile desde el que podremos volver a nuestro perfil y un botón para hacer Logout.

<img src="src/img/profile.jpg" width="1500">

Tanto si clickamos en Tasks, Notes o Contacts, nos redirigirá a dicha vista y nos mostrará todas las entradas que tiene el usuario logueado en su perfil. En cada vista, podremos crear una nueva entrada, o clickar sobre el título o nombre del objeto y acceder a los detalles, donde podremos modificar los campos.

<img src="src/img/tasks.jpg" width="1500">
<img src="src/img/tasksdetail.jpg" width="1500">
<a name="tools"></a>
## Tecnologías y dependencias utilizadas

<img src="src/img/js.jpg" width="90em"/>
<img src="src/img/github.png" width="90em"/><img src="src/img/react.png" width="90em"/><img src="src/img/redux.png" width="90em"/><img src="src/img/ant-design.jpg" width="90em"/><img src="src/img/aws.png" width="90em"/><img src="src/img/heroku.png" width="90em"/>
</br>


<hr>

<a name="developers"></a>
## Developers ✍️

[Raquel Moya](https://github.com/RaquelMoya)

Última edición: 11/04/2022
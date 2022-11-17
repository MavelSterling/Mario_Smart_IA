# Mario_Smart_IA

Proyecto de la asignatura de **Inteligencia Artificial**, séptimo semestre de Ingenieria de Sistemas en la Universidad del Valle, Colombia.

Consiste en una matriz de juego donde un agente inteligente tiene como objetivo llegar a la meta evitando obstáculos y recolectando poderes.

> Podrás usar la aplicación [aquí](https://mario-smart-ia.vercel.app/).

## Algoritmos de búsqueda

El agente inteligente encuentra la meta usando los siguientes algoritmos de búsqueda:

1. Búsquedas no informadas:

- Preferente por amplitud.
- Preferente por profundidad evitando ciclos.
- De costo uniforme.

2. Búsquedas informadas:

- Avara.
- A\*.

> Puedes consultar los algoritmos de búsqueda mencionados anteriormente en internet.

## Especificaciones

Mario buscará a la princesa de 5 formas diferentes (algoritmos de búsqueda).

- Pasar por una casilla en blanco, una casilla que contenga un poder o encontrar a la princesa tendrá un costo de **1**.

- Pasar por una casilla que contenga un koopa, sin tener poderes activos tendrá un costo de **6**.

- Cuando tomamos un poder, este tendrá efecto a partir de la siguiente casilla.

- Al tomar una flor se le otorgará a Mario una bola de fuego con la que podrá reducir el costo de pasar por un koopa de **6** a **1**. El costo de pasar por una casilla seguirá siendo **1**.

- Al tomar una estrella las casillas pasarán de tener un costo de **1** a **0.5**, durante 6 movimientos.

- Pasar por una casilla que contenga un koopa, mientras Mario tenga el poder de la flor, tendrá un costo de **1**.

- Pasar por una casilla que contenga un koopa, mientras Mario tenga el poder de la estrella, tendrá un costo de **0.5**.

- Los poderes se pueden acumular, pero Mario no podrá tomar una flor mientras tenga el poder de una estrella y viceversa.

## Como usar la aplicación

Estando en la interfaz de juego, se te pedirá seleccionar un archivo de texto para cargar una matriz.

Ejemplo:

1 0 0 0 0 0 0 0 1 1<br> 0 3 1 1 0 1 1 0 0 1<br> 1 1 1 1 0 1 1 1 3 0<br> 0 0 0 0 0 1 1 1 1 0<br> 2 1 1 1 0 0 0 0 5 5<br> 0 0 0 1 0 1 1 1 1 5<br> 0 1 0 0 0 5 5 5 0 0<br> 0 1 1 0 1 1 1 1 1 0<br> 0 4 4 0 1 1 1 6 0 0<br> 1 1 1 1 1 1 1 0 1 1<br>

Donde los números representan:

0 = Espacio en blanco, donde el agente puede pasar.<br> 1 = Muro, obstáculo donde el agente no podra pasar.<br> 2 = Mario, el agente inteligente.<br> 3 = Poder de estrella, dura 6 casillas.<br> 4 = Poder de flor, contiene 1 bola de fuego.<br> 5 = Koopa, enemigo del agente.<br> 6 = Princesa, el objetivo del agente.<br>

## Ejecución de la aplicación

Para ejecutar el código:

1. Descargar el código fuente.
2. Acceder a la carpeta raíz.
3. Tener instalado:
   - nodejs
   - yarn
4. Ejecutar los siguientes comandos:
   - `yarn`
   - `yarn dev`

> Ahora la aplicación se estará ejecutando en `http://127.0.0.1:5173`

### Encontrarás mas ejemplos en:

> `src/games`

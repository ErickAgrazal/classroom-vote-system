# classroom-vote-system
Proyecto que sirve para realizar una votación dentro de un salón de clases usando Ethereum como backend.

## ¿Cómo funciona?

1. Solamente permite un voto por estudiante.
2. Los votos de estudiantes son permitidos durante un lapso específico de tiempo.
3. Solamente estudiantes del salón pueden votar.
4. Un estudiante debe autenticarse para poder votar.
5. Al final de la votación, el sistema debe ser transparente con los votos y permitir que los participantes puedan verificar quién fue el ganador, pero asegurando la privacidad del voto.

## Dependencias
1. NodeJS
2. NPM
3. Ganache CLI
4. Nodemon
5. Vagrant
6. Virtualbox

## Comandos para interactuar con el servidor
#### Iniciar
La primera vez: `vagrant up --provision` <br>
De la segunda en adelante: `vagrant up`

#### Apagar
`vagrant halt`

#### Reiniciar
`vagrant reload`

#!/bin/bash

# Navegue até a pasta fullstack-backend e instale as dependências
cd ./fullstack-backend
npm install --omit=dev

# Inicie o servidor em modo de desenvolvimento
npm run start:dev &

# Aguarde alguns segundos para garantir que o servidor esteja em execução
sleep 10

# Instale as dependências novamente e inicie o servidor em modo de desenvolvimento
cd ../
cd ./fullstack-frontend
npm install --omit=dev
npm run dev

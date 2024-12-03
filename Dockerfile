FROM node:20
WORKDIR /appsporto
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
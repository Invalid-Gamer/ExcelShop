# Basis-Image mit Node.js
FROM node:20-alpine

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Nur package.json und package-lock.json kopieren (um Caching zu nutzen)
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install dotenv express mysql2

# Den Rest des Projekts kopieren
COPY . .

# Port freigeben (z. B. 3000)
EXPOSE 3000

# Start-Befehl
CMD ["node", "src/server.js"]

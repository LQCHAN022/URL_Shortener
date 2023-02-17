FROM node:alpine AS Production

# Set node environement for the entire container
ENV NODE_ENV=production

# Create workdir in container
WORKDIR /usr/src/api

# Copies packages to ^
COPY package.json .
COPY package-lock.json .

# Installs the dependencies ^
RUN npm install

# Copy all local files
COPY . . 

# Build
RUN npm run build

# Entry command to start server
CMD ["sh", "-c", "npm run start:production"]
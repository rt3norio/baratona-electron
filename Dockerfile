FROM node:10.15

WORKDIR /app
COPY . /app

#RUN rm bdstart.sh
RUN apt-get update
# I think you need to install following 
RUN apt-get -y install libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 libgtk-3-0
RUN npm install --save electron
RUN npm install

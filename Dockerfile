FROM node:18

# Install FluidSynth, LAME, and wget
RUN apt-get update && \
    apt-get install -y fluidsynth lame wget && \
    mkdir /app

WORKDIR /app

COPY . .

# Download SoundFont
RUN wget -O FluidR3_GM.sf2 https://files.presonusmusic.com/technicalsupport/FluidR3_GM.sf2

RUN npm install

CMD ["node", "server.js"]

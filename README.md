# IR TV Remote

A web-based TV remote control served from a Raspberry Pi. An SVG remote is displayed in the browser — clicking a button sends a POST request to the Express server, which triggers the IR LED via [IR-Slinger](https://github.com/bschwind/ir-slinger) and [libpigpio](https://github.com/joan2937/pigpio).

## Requirements

- Raspberry Pi with an IR LED wired up (see [Hardware setup](#hardware-setup))
- Node.js 24+
- GCC + libpigpio (for compiling the IR transmitter)

## Setup

### 1. Install libpigpio

```sh
git clone https://github.com/joan2937/pigpio.git
cd pigpio
make
sudo make install
```

### 2. Compile the IR transmitter

```sh
cd src/ir-slinger
gcc -o tvRemote tvRemote.c -lm -lpigpio -pthread -lrt
```

### 3. Configure

Edit `config.json` and set the path to the compiled executable:

```json
{
    "pathToExecutable": "/path/to/tvRemote"
}
```

### 4. Add your IR codes

Edit `src/data/RemoteKeysBinaryMapping.json` to map button IDs to the binary IR codes for your specific TV (Check tutorial under src/ir-slinger/bschwind-tutorial.png for how to capture).

### 5. Install dependencies and build

```sh
npm install
npm run build
```

### 6. Start the server

```sh
npm start
```

The remote is then available at `http://<raspberry-pi-ip>:3000`.

## Docker

```sh
docker compose up --build
```

This builds the frontend and starts the server in one step. Mount `config.json` as a volume to change settings without rebuilding the image.

## Development

```sh
npm run dev   # Vite dev server on :5173, proxies /api to Express on :3000
npm start     # Express server on :3000 (in a separate terminal)
```

## Hardware setup

![breadboard image](https://raw.githubusercontent.com/Azlond/IR-TV-Remote/master/breadboard.png)

See [this blog post by Brian Schwind](https://blog.bschwind.com/2016/05/29/sending-infrared-commands-from-a-raspberry-pi-without-lirc/) for a full walkthrough of the hardware setup and IR protocol.

## Credits & Licenses

- [libpigpio](https://github.com/joan2937/pigpio) — GPIO library for the Raspberry Pi
- [IR-Slinger](https://github.com/bschwind/ir-slinger) — IR signal library by Brian Schwind
- [remote.svg](https://openclipart.org/detail/27349/remote-control) — public domain SVG by [AshKyd](https://openclipart.org/user-detail/AshKyd)

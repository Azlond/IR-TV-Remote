Dependencies & Recognition
------------

* [libpigpio](https://github.com/joan2937/pigpio)
	* (git clone https://github.com/joan2937/pigpio.git)
	* cd pigpio
	* make
	* sudo make install
  
* [IR-Slinger](https://github.com/bschwind/ir-slinger)
	* (git clone https://github.com/bschwind/ir-slinger.git)
	* add IR-codes to test.c or testRawCodes.c
	* gcc -o filename test.c -lm -lpigpio -pthread -lrt 
	* to get the codes needed for test.c, run irslinger-codes.py (also by [bschwind](https://github.com/bschwind)).

* [remote.svg](https://openclipart.org/detail/27349/remote-control)
	* the remote.svg image is public domain and was taken from [AshKyd](https://openclipart.org/user-detail/AshKyd)

Tutorial
--------

[Blog post by Brian Schwind](https://blog.bschwind.com/2016/05/29/sending-infrared-commands-from-a-raspberry-pi-without-lirc/)

Hardware setup
--------------
![breadboard image](https://raw.githubusercontent.com/Azlond/IR-TV-Remote/master/breadboard.png)
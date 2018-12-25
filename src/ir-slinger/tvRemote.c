#include <stdio.h>
#include <stdlib.h>
#include "irslinger.h"
#include <time.h>

int main(int argc, char *argv[]) {
	uint32_t outPin = 18;           // The Broadcom pin number the signal will be sent on
	int frequency = 38000;          // The frequency of the IR signal in Hz
	double dutyCycle = 0.5;         // The duty cycle of the IR signal. 0.5 means for every cycle,
	                                // the LED will turn on for half the cycle time, and off the other half
	int x = 775;			// value for a short pulse used with my raspberry pi 3 B (about 850 microseconds) 
	int y = 1550;			// value for a long pulse used with my raspberry pi 3 B (about 1750 microseconds)

	if (argc == 2) {		//only one command line argument
		char *tvcode = argv[1];				// IR binary code. short pulses 0, long pulses 1
		int codeLength = strlen(tvcode);		// length of the code
		int codes[codeLength+12];
		int i;
		for (i = 0; i < 12; i++) {			// the tv remote uses an uncommon protocoll
			if(i == 2) {				// either the 3rd or the 5th pulse is long
				srand(time(NULL));		// I wasn't able to find a difference between using the third or the fifth pulse as the long one
				if (rand() % 2 == 0) {		// therefore, I'm using both and randomizing the occurence.
					codes[2] = x;		// Furthermore, the header appears to be 12 pulses long
					codes[4] = y;
				} else {
					codes[2] = y;
					codes[4] = x;
				}
			} else if (i == 4) {
				//skip
			} else if (i == 11) {
				codes[11] = y;
			} else {
				codes[i] = x;
			}
		}


		int j;
		for (j=0; j < codeLength; j++) {
			if (tvcode[j] == 48) { 			//48 is ascii 0
				codes[j+12] = x;
			} else if (tvcode[j] == 49) { 		//49 is ascii 1
				codes[j+12] = y;
			} else {
				printf("Invalid input: %d at position %d", tvcode[j], j);
				exit(EXIT_FAILURE);
			}
		}

		int result = irSlingRaw(
			outPin,
			frequency,
			dutyCycle,
			codes,
			sizeof(codes) / sizeof(int));
		return result;
	} else {
		printf("One argument expected.");
	}
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "irslinger.h"

int main(int argc, char *argv[]) {
	uint32_t outPin = 18;           // The Broadcom pin number the signal will be sent on
	int frequency = 38000;          // The frequency of the IR signal in Hz
	double dutyCycle = 0.5;         // The duty cycle of the IR signal. 0.5 means for every cycle,
	                                // the LED will turn on for half the cycle time, and off the other half
	int x = 775;                    // value for a short pulse used with my raspberry pi 3 B (about 850 microseconds)
	int y = 1550;                   // value for a long pulse used with my raspberry pi 3 B (about 1750 microseconds)

	srand(time(NULL));

	if (argc == 2) {
		char *tvcode = argv[1];                 // IR binary code: '0' = short pulse, '1' = long pulse
		int codeLength = strlen(tvcode);
		int codes[64];                          // fixed-size buffer; valid codes are at most 11 chars + 12 header pulses

		// Build the 12-pulse header.
		// The protocol requires either the 3rd (index 2) or 5th (index 4) header pulse to be long.
		// No observable difference was found between the two, so the choice is randomised.
		int longPulseAtTwo = rand() % 2;
		int i;
		for (i = 0; i < 12; i++) {
			if (i == 2) {
				codes[2] = longPulseAtTwo ? y : x;
			} else if (i == 4) {
				codes[4] = longPulseAtTwo ? x : y;
			} else if (i == 11) {
				codes[11] = y;
			} else {
				codes[i] = x;
			}
		}

		// Translate the binary string into pulse durations
		int j;
		for (j = 0; j < codeLength; j++) {
			if (tvcode[j] == '0') {
				codes[j + 12] = x;
			} else if (tvcode[j] == '1') {
				codes[j + 12] = y;
			} else {
				printf("Invalid input: %c at position %d\n", tvcode[j], j);
				return EXIT_FAILURE;
			}
		}

		int result = irSlingRaw(
			outPin,
			frequency,
			dutyCycle,
			codes,
			codeLength + 12);
		return result;
	} else {
		printf("One argument expected.\n");
		return EXIT_FAILURE;
	}
}

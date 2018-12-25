#include <stdio.h>
#include "irslinger.h"

int main(int argc, char *argv[])
{
	uint32_t outPin = 18;            // The Broadcom pin number the signal will be sent on
	int frequency = 38000;           // The frequency of the IR signal in Hz
	double dutyCycle = 0.5;          // The duty cycle of the IR signal. 0.5 means for every cycle,
	                                 // the LED will turn on for half the cycle time, and off the other half
	int leadingPulseDuration = 8000; // The duration of the beginning pulse in microseconds
	int leadingGapDuration = 4000;   // The duration of the gap in microseconds after the leading pulse
	int onePulse = 500;              // The duration of a pulse in microseconds when sending a logical 1
	int zeroPulse = 500;             // The duration of a pulse in microseconds when sending a logical 0
	int oneGap = 1500;               // The duration of the gap in microseconds when sending a logical 1
	int zeroGap = 500;               // The duration of the gap in microseconds when sending a logical 0
	int sendTrailingPulse = 1;       // 1 = Send a trailing pulse with duration equal to "onePulse"
	                                 // 0 = Don't send a trailing pulse

	int result = irSling(
		outPin,
		frequency,
		dutyCycle,
		leadingPulseDuration,
		leadingGapDuration,
		onePulse,
		zeroPulse,
		oneGap,
		zeroGap,
		sendTrailingPulse,
		"00000000110111110101000010101111");

	return result;
}

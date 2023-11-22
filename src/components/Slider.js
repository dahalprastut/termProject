import * as React from "react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Tooltip } from "@chakra-ui/react";

// 1. import `ChakraProvider` component

export default function TimeSlider({ changeSlider, defaultVal }) {
	// 2. Wrap ChakraProvider at the root of your app
	const containerStyle = {
		width: "90%", // Adjust as needed
		margin: "0 auto", // Center the container
	};

	const [sliderValue, setSliderValue] = React.useState(5);
	const [showTooltip, setShowTooltip] = React.useState(false);
	const marks = [
		{ value: 0, name: "All" },
		{ value: 25, name: "Spring" },
		{ value: 50, name: "Summer" },
		{ value: 75, name: "Autumn" },
		{ value: 100, name: "Winter" },
	];
	// Find the corresponding name for the current slider value
	const currentMark = marks.find((mark) => mark.value === sliderValue);
	const step = 25; // Set the step value to your desired interval

	const changeHandler = (v) => {
		setSliderValue(v);
		changeSlider(v);
	};
	return (
		<div style={containerStyle}>
			<Slider
				id="slider"
				defaultValue={defaultVal}
				min={0}
				max={100}
				colorScheme="teal"
				step={step}
				onChange={(v) => changeHandler(v)}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
					All
				</SliderMark>
				<SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
					Spring
				</SliderMark>
				<SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
					Summer
				</SliderMark>
				<SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
					Autumn
				</SliderMark>
				<SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
					Winter
				</SliderMark>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<Tooltip
					hasArrow
					bg="teal.500"
					color="white"
					placement="top"
					isOpen={showTooltip}
					label={currentMark ? currentMark.name : ""}
				>
					<SliderThumb />
				</Tooltip>
			</Slider>
		</div>
	);
}

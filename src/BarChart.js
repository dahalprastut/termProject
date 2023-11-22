import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { finalData as newData } from "./util";
import TimeSlider from "./components/Slider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ showData, parameters }) {
	const [selectedParameter, setSelectedParameter] = useState("TN");
	const [season, setSeason] = useState("Summer");
	const calculateMean = (values) => {
		const sum = values.reduce((acc, val) => acc + val, 0);
		return sum / values.length;
	};

	// Calculate mean values for the selected parameter
	const meanValues = newData.map((wetland) => {
		const values =
			wetland.individual_values[season]?.[selectedParameter]?.map((value) => (value === undefined ? 0 : value)) ||
			[];

		const mean = calculateMean(values);
		return {
			[`mean`]: mean,
			name: wetland.name,
		};
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `Mean value of ${selectedParameter} for ${season} season`,
				font: {
					size: 14,
				},
			},
		},
	};

	const labels = meanValues
		.map((el) => el.name)
		.map((label) => {
			const newLabel = label
				.replace("Wetland ", "")
				.replace("Aurand Run connection", "ARC")
				.replace("Aurand Run upstream", "ARU");
			return newLabel;
		});

	const data = {
		labels,
		datasets: [
			{
				label: `${selectedParameter}`,
				data: meanValues.map((el) => el.mean),
				borderColor: "rgb(255, 99, 132)",
				borderWidth: "2",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			//   {
			//     label: 'Dataset 2',
			//     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			//     backgroundColor: 'rgba(53, 162, 235, 0.5)',
			//   },
		],
	};

	useEffect(() => {
		const meanValues = newData.map((wetland) => {
			const values =
				wetland.individual_values[season]?.[selectedParameter]?.map((value) =>
					value === undefined ? 0 : value
				) || [];

			// console.log("val", values);
			const mean = calculateMean(values);
			return {
				[`mean`]: mean,
				name: wetland.name,
			};
		});
	}, [season]);
	const sliderChangeHandler = (e) => {
		if (e === 0) {
			setSeason("all");
		} else if (e === 25) {
			setSeason("Spring");
		} else if (e === 50) {
			setSeason("Summer");
		} else if (e === 75) {
			setSeason("Autumn");
		} else if (e === 100) {
			setSeason("Winter");
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;

		setSelectedParameter(value);
	};

	return (
		<>
			<div className="select-box">
				<div>
					<label htmlFor="selectedParameter">Parameter: </label>
					<select name="selectedParameter" defaultValue={selectedParameter} onChange={handleChange}>
						{parameters.map((el) => (
							<option value={el}>{el}</option>
						))}
					</select>
				</div>
			</div>
			<div className="slider bar-slider">
				<TimeSlider changeSlider={sliderChangeHandler} defaultVal={50} />
			</div>

			<Bar options={options} data={data} />
		</>
	);
}

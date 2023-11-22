import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Scatter } from "react-chartjs-2";
import { finalData as newData } from "./util";
import TimeSlider from "./components/Slider";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Scatterplot({ showData, parameters }) {
	// The parameter change is needed for every individual charts
	const isInitialRender = useRef(true);
	const [shownParameterOne, setShownParameterOne] = useState("TN");
	const [shownParameterTwo, setShownParameterTwo] = useState("TP");
	const [checkbox, setCheckbox] = useState(true);
	const [season, setSeason] = useState("Spring");
	const [dataOne, setDataOne] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values[season]?.[shownParameterOne] ?? [])
					.flat()
					.filter((val) => val !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name).individual_values[season]?.[shownParameterOne] ??
					[];
			}

			return dataArray;
		})()
	);
	const [dataTwo, setDataTwo] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values[season]?.[shownParameterTwo] ?? [])
					.flat()
					.filter((val) => val !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name).individual_values[season]?.[shownParameterTwo] ??
					[];
			}

			return dataArray;
		})()
	);

	const combinedData = dataOne.map((x, index) => ({ x, y: dataTwo[index] }));

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `Relation of ${shownParameterOne} and ${shownParameterTwo} in ${
					checkbox ? "All Waterpools" : showData.name
				} for ${season} season`,
				font: {
					size: 14,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				display: true,
				title: {
					display: true,
					// text: `${shownParameterTwo}`,
					text: `${shownParameterTwo}`,
					font: { size: 16 },
				},
			},
			x: {
				title: {
					display: true,
					// text: `${shownParameterTwo}`,
					text: `${shownParameterOne}`,
					font: { size: 16 },
				},
			},
		},
	};
	// const overlappingPointsCheck = (x, y) => {
	// 	if (!x.parsed) return;

	// 	let overlappingPoints = false;
	// 	for (let i = x.datasetIndex + 1; i < x.chart.data.datasets.length; i++) {
	// 		if (x.parsed.y === x.chart.data.datasets[i].data[x.parsed.x]) {
	// 			overlappingPoints = true;
	// 			break;
	// 		}
	// 	}
	// 	return overlappingPoints;
	// };

	const datas = {
		datasets: [
			{
				label: `${shownParameterOne} vs ${shownParameterTwo}`,
				data: combinedData,
				borderColor: "rgb(255, 99, 132)",
				borderWidth: "2",
				// backgroundColor: (x, y) => {
				// 	return overlappingPointsCheck(x, y) ? "red" : "red";
				// },
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				pointRadius: 3,
				pointHoverRadius: 3,
			},
		],
	};
	useEffect(() => {
		if (isInitialRender.current) {
			// Don't run the effect on initial render
			isInitialRender.current = false;
			return;
		}

		setCheckbox(false);
	}, [showData]);

	useEffect(() => {
		setDataOne(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values[season]?.[shownParameterOne] ?? [])
						.flat()
						.filter((val) => val !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name).individual_values[season]?.[
							shownParameterOne
						] ?? [];
				}

				return dataArray;
			})()
		);
		setDataTwo(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values[season]?.[shownParameterTwo] ?? [])
						.flat()
						.filter((val) => val !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name).individual_values[season]?.[
							shownParameterTwo
						] ?? [];
				}

				return dataArray;
			})()
		);
	}, [showData, shownParameterOne, shownParameterTwo, season, checkbox]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "parameterOne") {
			setShownParameterOne(value);
		} else if (name === "parameterTwo") {
			setShownParameterTwo(value);
		} else {
			setCheckbox(!checkbox);
		}
	};

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

	return (
		<>
			<div className="select-box">
				<div>
					<label htmlFor="parameterOne">X axis: </label>
					<select name="parameterOne" defaultValue={shownParameterOne} onChange={handleChange}>
						{parameters.map((el) => (
							<option value={el}>{el}</option>
						))}
					</select>
					<label htmlFor="parameterTwo">Y axis: </label>
					<select name="parameterTwo" defaultValue={shownParameterTwo} onChange={handleChange}>
						{parameters.map((el) => (
							<option value={el}>{el}</option>
						))}
					</select>
				</div>
				<div className="all-pools">
					<label htmlFor="allData">Select All Pools</label>
					<input type="checkbox" checked={checkbox} value={checkbox} onChange={handleChange} />
				</div>
			</div>
			<div className="slider">
				<TimeSlider changeSlider={sliderChangeHandler} defaultVal={25} />
			</div>
			<Scatter options={options} data={datas} />
		</>
	);
}

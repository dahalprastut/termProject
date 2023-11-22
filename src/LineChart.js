import React, { useEffect, useState, useRef } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { finalData as soilData, finalDataWater as waterData } from "./util";
// import { finalData as newData } from "./util";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ activeTab, showData, parameters }) {
	const isInitialRender = useRef(true);
	const [newData, setNewData] = useState(soilData);
	const [shownParameter, setShownParameter] = useState("TN");
	const [checkbox, setCheckbox] = useState(true);

	useEffect(() => {
		setShownParameter("TN");
		if (activeTab === "Water") {
			setNewData(waterData);
		} else {
			setNewData(soilData);
		}
	}, [activeTab]);

	// check for checkbox here

	const [meanAutumn, setMeanAutumn] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values["Autumn"]?.[shownParameter] ?? [])
					.flat()
					.filter((value) => value !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name)?.individual_values["Autumn"]?.[shownParameter] ??
					[];
			}

			// Calculate the mean
			const sum = dataArray.reduce((acc, value) => acc + value, 0);
			const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

			return mean;
		})()
	);
	const [meanSummer, setMeanSummer] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values["Summer"]?.[shownParameter] ?? [])
					.flat()
					.filter((value) => value !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name)?.individual_values["Summer"]?.[shownParameter] ??
					[];
			}

			// Calculate the mean
			const sum = dataArray.reduce((acc, value) => acc + value, 0);
			const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

			return mean;
		})()
	);
	const [meanSpring, setMeanSpring] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values["Spring"]?.[shownParameter] ?? [])
					.flat()
					.filter((value) => value !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name)?.individual_values["Spring"]?.[shownParameter] ??
					[];
			}

			// Calculate the mean
			const sum = dataArray.reduce((acc, value) => acc + value, 0);
			const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

			return mean;
		})()
	);
	const [meanWinter, setMeanWinter] = useState(
		(() => {
			let dataArray;
			if (checkbox) {
				dataArray = newData
					.map((el) => el.individual_values["Winter"]?.[shownParameter] ?? [])
					.flat()
					.filter((value) => value !== undefined);
			} else {
				dataArray =
					newData.find((el) => el.name === showData.name)?.individual_values["Winter"]?.[shownParameter] ??
					[];
			}

			// Calculate the mean
			const sum = dataArray.reduce((acc, value) => acc + value, 0);
			const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

			return mean;
		})()
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `Mean values of ${shownParameter} in ${checkbox ? "All pools" : showData.name}`,
				font: {
					size: 14,
				},
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 16,
					},
				},
			},
		},
	};

	const labels = ["Spring", "Autumn", "Summer", "Winter"];

	const data = {
		labels,
		datasets: [
			{
				label: `${shownParameter}`,
				data: [meanSpring, meanAutumn, meanSummer, meanWinter],
				borderColor: "rgb(255, 99, 132)",
				borderWidth: "2",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			// {
			// 	label: "TP",
			// 	data: [meanAutumnTP, meanSummerTP, meanWinterTP, meanSpringTP],
			// 	borderColor: "rgb(53, 162, 235)",
			// 	backgroundColor: "rgba(53, 162, 235, 0.5)",
			// },
			// {
			// 	label: "Al",
			// 	data: [meanAutumnAl, meanSummerAl, meanWinterAl, meanSpringAl],
			// 	borderColor: "#FFD200",
			// 	backgroundColor: "#FFCF00",
			// },
			// {
			// 	label: "Fe",
			// 	data: [meanAutumnFe, meanSummerFe, meanWinterFe, meanSpringFe],
			// 	borderColor: "#00B2AA",
			// 	backgroundColor: "#80DBD5",
			// },
			// {
			// 	label: "P",
			// 	data: [meanAutumnP, meanSummerP, meanWinterP, meanSpringP],
			// 	borderColor: "#fc8d59",
			// 	backgroundColor: "#fc8d59",
			// },
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
		// Do it for checkbox
		setMeanAutumn(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values["Autumn"]?.[shownParameter] ?? [])
						.flat()
						.filter((value) => value !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name)?.individual_values["Autumn"]?.[
							shownParameter
						] ?? [];
				}

				// Calculate the mean
				const sum = dataArray.reduce((acc, value) => acc + value, 0);
				const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

				return mean;
			})()
		);
		setMeanSummer(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values["Summer"]?.[shownParameter] ?? [])
						.flat()
						.filter((value) => value !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name)?.individual_values["Summer"]?.[
							shownParameter
						] ?? [];
				}

				// Calculate the mean
				const sum = dataArray.reduce((acc, value) => acc + value, 0);
				const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

				return mean;
			})()
		);
		setMeanSpring(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values["Spring"]?.[shownParameter] ?? [])
						.flat()
						.filter((value) => value !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name)?.individual_values["Spring"]?.[
							shownParameter
						] ?? [];
				}

				// Calculate the mean
				const sum = dataArray.reduce((acc, value) => acc + value, 0);
				const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

				return mean;
			})()
		);
		setMeanWinter(
			(() => {
				let dataArray;
				if (checkbox) {
					dataArray = newData
						.map((el) => el.individual_values["Winter"]?.[shownParameter] ?? [])
						.flat()
						.filter((value) => value !== undefined);
				} else {
					dataArray =
						newData.find((el) => el.name === showData.name)?.individual_values["Winter"]?.[
							shownParameter
						] ?? [];
				}

				// Calculate the mean
				const sum = dataArray.reduce((acc, value) => acc + value, 0);
				const mean = dataArray.length > 0 ? sum / dataArray.length : 0;

				return mean;
			})()
		);
	}, [showData, shownParameter, checkbox, newData]);

	const handleChange = (e) => {
		if (e.target.name === "parameterOne") {
			setShownParameter(e.target.value);
		} else {
			setCheckbox(!checkbox);
		}
	};

	return (
		<>
			{console.log("new", data)}
			<div className="select-box">
				<div>
					<label htmlFor="parameterOne">Parameter: </label>
					<select name="parameterOne" defaultValue={shownParameter} onChange={handleChange}>
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
			<Line options={options} data={data} />
		</>
	);
}

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
// import { finalData as newData } from "./util";
import { finalData as soilData, finalDataWater as waterData } from "./util";
import TimeSlider from "./components/Slider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ activeTab, showData, parameters }) {
	const [newData, setNewData] = useState(soilData);
	const [selectedParameter, setSelectedParameter] = useState("TN");
	const [selectedOrder, setSelectedOrder] = useState("Random");
	const [orderParameters, setOrderParameters] = useState(["Random", "Ascending", "Descending"]);
	const [season, setSeason] = useState("Summer");
	const calculateMean = (values) => {
		const sum = values?.reduce((acc, val) => acc + val, 0);
		return sum / values?.length;
	};

	const marks = [
		{ value: 0, name: "All" },
		{ value: 25, name: "Spring" },
		{ value: 50, name: "Summer" },
		{ value: 75, name: "Autumn" },
		{ value: 100, name: "Winter" },
	];
	useEffect(() => {
		setSelectedParameter("TN");

		if (activeTab === "Water") {
			setNewData(waterData);
		} else {
			setNewData(soilData);
		}
	}, [activeTab]);

	const computeAscending = (data) => {
		// return data;
		return data?.slice()?.sort((a, b) => {
			const meanA = calculateMean(a?.individual_values?.[season]?.[selectedParameter]);
			const meanB = calculateMean(b?.individual_values?.[season]?.[selectedParameter]);
			return meanA - meanB;
		});
	};
	const computeDescending = (data) => {
		return data?.slice()?.sort((a, b) => {
			const meanA = calculateMean(a?.individual_values?.[season]?.[selectedParameter]);
			const meanB = calculateMean(b?.individual_values?.[season]?.[selectedParameter]);
			return meanB - meanA;
		});
		// return data.slice().sort((a, b) => b - a);
	};

	// Calculate mean values for the selected parameter
	const [meanValues, setMeanValues] = useState(
		newData.map((wetland) => {
			const values =
				wetland.individual_values[season]?.[selectedParameter]?.map((value) =>
					value === undefined ? 0 : value
				) || [];

			const mean = calculateMean(values);
			return {
				[`mean`]: mean,
				name: wetland.name,
			};
		})
	);

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
			const newLabel = label;
			// .replace("Wetland ", "")
			// .replace("Aurand Run connection", "ARC")
			// .replace("Aurand Run upstream", "ARU");
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
		const sortedData =
			selectedOrder === "Ascending"
				? computeAscending(newData)
				: selectedOrder === "Descending"
				? computeDescending(newData)
				: newData;
		setMeanValues(
			sortedData.map((wetland) => {
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
			})
		);
	}, [season, newData, selectedParameter, selectedOrder]);
	const sliderChangeHandler = (e) => {
		if (e.target.value == 0) {
			setSeason("all");
		} else if (e.target.value == 25) {
			setSeason("Spring");
		} else if (e.target.value == 50) {
			setSeason("Summer");
		} else if (e.target.value == 75) {
			setSeason("Autumn");
		} else if (e.target.value == 100) {
			setSeason("Winter");
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "selectedParameter") {
			setSelectedParameter(value);
		} else {
			setSelectedOrder(value);
		}
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
					<label htmlFor="parameterTwo">Arrange: </label>
					<select name="parameterTwo" defaultValue={selectedOrder} onChange={handleChange}>
						{orderParameters.map((el) => (
							<option value={el}>{el}</option>
						))}
					</select>
					<label htmlFor="parameterThree">Season: </label>
					<select name="parameterThree" defaultValue={50} onChange={sliderChangeHandler}>
						{marks.map((el) => (
							<option value={el.value}>{el.name}</option>
						))}
					</select>
				</div>
			</div>
			{/* <div className="slider bar-slider">
				<TimeSlider changeSlider={sliderChangeHandler} defaultVal={50} />
			</div> */}

			<Bar options={options} data={data} />
		</>
	);
}

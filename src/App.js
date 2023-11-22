import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import Scatterplot from "./Scatterplot";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { marker } from "leaflet";
import { finalData as newData } from "./util";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	const position = [41.0249, -83.68591];

	const [showData, setShowData] = useState({ name: "Wetland Pool 1" });

	// The parameter change is needed for every individual charts
	const parameters = ["TP", "TN", "Al", "Fe", "P"];
	const [shownParameterOne, setShownParameterOne] = useState("TN");
	const [shownParameterTwo, setShownParameterTwo] = useState("TP");
	const [dataOne, setDataOne] = useState(
		newData.find((el) => el.name === showData.name).individual_values.all[shownParameterOne]
	);
	const [dataTwo, setDataTwo] = useState(
		newData.find((el) => el.name === showData.name).individual_values.all[shownParameterTwo]
	);

	// load data from the json file all of them.
	// keep the underfined data as null or 0

	// console.log(newData);
	// console.log("data1", dataOne);

	const markers = newData.map((el) => {
		const obj = {
			geocode: [el.x, el.y],
			popUp: el.name,
		};
		return obj;
	});

	const customIcon = new Icon({
		iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
		iconSize: [38, 38],
	});

	const markerClickHandler = (e) => {
		// console.log("e", e);
		const shownData = newData.find((el) => el.name === e.target._popup._content);
		// e.target.setIcon(
		// 	e.target.options.icon.options.iconUrl == "https://cdn-icons-png.flaticon.com/512/684/684908.png"
		// 		? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
		// 		: "https://cdn-icons-png.flaticon.com/512/447/447031.png"
		// );
		setShowData(shownData);
	};

	return (
		<ChakraProvider>
			<div className="App">
				<h1>Visual Representation of Wetland pool</h1>
				<div className="tabs">
					<button className="active">Soil</button>
					<button>Water</button>
				</div>
				<div className="visualization">
					<div className="map-container">
						<MapContainer center={position} zoom={17}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							{markers.map((marker) => (
								<Marker
									position={marker.geocode}
									icon={customIcon}
									eventHandlers={{
										mouseover: (e) => {
											// Open popup on marker hover
											e.target.bindPopup(marker.popUp).openPopup();
										},
										mouseout: (e) => {
											// Close popup on marker mouseout
											e.target.closePopup();
										},
										click: (e) => {
											markerClickHandler(e);
										},
									}}
								></Marker>
							))}
						</MapContainer>
					</div>
					<div className="line-chart-container">
						<LineChart showData={showData} parameters={parameters} />
					</div>
					<div className="scatterplot-container">
						<Scatterplot showData={showData} parameters={parameters} />
					</div>

					<div className="bar-chart-container">
						<BarChart showData={showData} parameters={parameters} />
					</div>
				</div>
			</div>
		</ChakraProvider>
	);
}

export default App;

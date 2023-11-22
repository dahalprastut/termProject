// const data = [
// 	{
// 		name: "Wetland Pool 2",
// 		x: 41.0249,
// 		y: -83.6873,
// 		tp: 654,
// 		tn: 22,
// 		date: "2021/05/27",
// 	},
// 	{
// 		name: "Wetland Pool 2",
// 		x: 41.0243,
// 		y: -83.6968,
// 		tp: 1233,
// 		tn: 55,
// 		date: "2021/05/27",
// 	},
// 	{
// 		name: "Wetland Pool 1",
// 		x: 41.0239,
// 		y: -83.6963,
// 		tp: 994,
// 		tn: 111,
// 		date: "2022/10/25",
// 	},
// 	{
// 		name: "Wetland Pool 3",
// 		x: 41.0234,
// 		y: -83.6951,
// 		tp: 664,
// 		tn: 500,
// 		date: "2021/05/27",
// 	},
// 	{
// 		name: "Wetland Pool 3",
// 		x: 41.0234,
// 		y: -83.6951,
// 		tp: 1003,
// 		tn: 321,
// 		date: "2022/11/21",
// 	},
// 	{
// 		name: "Wetland Pool 2",
// 		x: 41.3243,
// 		y: -83.6968,
// 		tp: 222,
// 		tn: 51,
// 		date: "2021/04/27",
// 	},
// ];

const data = require("./data/soil.json");

const newData = Object.values(
	data.reduce((acc, curr) => {
		const { name, x, y, ...rest } = curr;

		if (!acc[name]) {
			acc[name] = {
				name,
				x,
				y,
				values: { TP: [rest?.TP], TN: [rest.TN], date: [rest.date], Fe: [rest.Fe], Al: [rest.Al], P: [rest.P] },
				individual_values: {},
			};
		} else {
			acc[name].values.TP?.push(rest.TP);
			acc[name].values.TN?.push(rest.TN);
			acc[name].values.date.push(rest.date);
			acc[name].values.Fe.push(rest.Fe);
			acc[name].values.Al.push(rest.Al);
			acc[name].values.P.push(rest.P);
		}

		return acc;
	}, {})
);

newData.forEach((item) => {
	item.individual_values = item.values.date.reduce((obj, date, index) => {
		const TP = item.values.TP[index];
		const TN = item.values.TN[index];
		const Fe = item.values.Fe[index];
		const Al = item.values.Al[index];
		const P = item.values.P[index];

		const parsedDate = new Date(date);
		const month = parsedDate.getMonth() + 1;

		let season = "";
		if (month >= 3 && month <= 5) {
			season = "Spring";
		} else if (month >= 6 && month <= 8) {
			season = "Summer";
		} else if (month >= 9 && month <= 11) {
			season = "Autumn";
		} else {
			season = "Winter";
		}

		if (!obj[season]) {
			obj[season] = { TP: [], TN: [], date: [], Al: [], P: [], Fe: [] };
		}

		obj[season].TP?.push(TP);
		obj[season].TN?.push(TN);
		obj[season].Al?.push(Al);
		obj[season].Fe?.push(Fe);
		obj[season].P?.push(P);
		obj[season].date.push(date);

		return obj;
	}, {});
});

const finalData = newData.map((item) => {
	const allValues = {
		TP: item.values.TP,
		TN: item.values.TN,
		Al: item.values.Al,
		Fe: item.values.Fe,
		P: item.values.P,
		date: item.values.date,
	};

	return {
		name: item.name,
		x: item.x,
		y: item.y,
		individual_values: {
			all: allValues,
			...item.individual_values,
		},
	};
});

export { finalData };

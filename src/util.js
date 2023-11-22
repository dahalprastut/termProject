// for soil
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

// for water

// for soil
const dataWater = require("./data/water.json");

const newDataWater = Object.values(
	dataWater.reduce((acc, curr) => {
		const { name, x, y, ...rest } = curr;

		if (!acc[name]) {
			acc[name] = {
				name,
				x,
				y,
				values: {
					TP: [rest?.TP],
					TN: [rest.TN],
					date: [rest.date],
					NH4: [rest.NH4],
					NO3: [rest.NO3],
					PO4: [rest.PO4],
				},
				individual_values: {},
			};
		} else {
			acc[name].values.TP?.push(rest.TP);
			acc[name].values.TN?.push(rest.TN);
			acc[name].values.date.push(rest.date);
			acc[name].values.NH4.push(rest.NH4);
			acc[name].values.NO3.push(rest.NO3);
			acc[name].values.PO4.push(rest.PO4);
		}

		return acc;
	}, {})
);

newDataWater.forEach((item) => {
	item.individual_values = item.values.date.reduce((obj, date, index) => {
		const TP = item.values.TP[index];
		const TN = item.values.TN[index];
		const NH4 = item.values.NH4[index];
		const NO3 = item.values.NO3[index];
		const PO4 = item.values.PO4[index];

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
			obj[season] = { TP: [], TN: [], date: [], NH4: [], PO4: [], NO3: [] };
		}

		obj[season].TP?.push(TP);
		obj[season].TN?.push(TN);
		obj[season].NH4?.push(NH4);
		obj[season].NO3?.push(NO3);
		obj[season].PO4?.push(PO4);
		obj[season].date.push(date);

		return obj;
	}, {});
});

const finalDataWater = newDataWater.map((item) => {
	const allValues = {
		TP: item.values.TP,
		TN: item.values.TN,
		NH4: item.values.NH4,
		NO3: item.values.NO3,
		PO4: item.values.PO4,
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

export { finalData, finalDataWater };

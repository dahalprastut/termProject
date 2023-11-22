const fs = require("fs");
const xlsx = require("xlsx");

// Read Excel file
const excelFilePath = "data.xlsx";
const workbook = xlsx.readFile(excelFilePath);

// Assume the data is in the second sheet (index 1)
const sheetIndex = 1;
const sheetName = workbook.SheetNames[sheetIndex];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Filter out rows with values containing '<MDL'
const cleanedData = sheetData.map((row) => {
	const cleanedRow = {};
	for (const key in row) {
		if (!String(row[key]).includes("<MDL")) {
			cleanedRow[key] = row[key];
		}
		if (key === "locName") {
			cleanedRow["name"] = row[key];
		}
	}
	return cleanedRow;
});

// Save the cleaned data as a single JSON file
const jsonFilePath = "soil.json";
fs.writeFileSync(jsonFilePath, JSON.stringify(cleanedData, null, 2));

console.log(`Saved ${jsonFilePath}`);

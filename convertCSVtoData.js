let printableCompanyArray = [""];

export const getNumOfGroups = async () => {
  const response = await fetch(
    "Retail ijst Tactic - Brabant Limburg Gelderland.csv"
  );
  const data = await response.text();
  const rows = data.split("\n").splice(1);

  let numOfGroups = Math.ceil(rows.length / 20);

  return numOfGroups;
};

const getData = async () => {
  const response = await fetch(
    "Retail ijst Tactic - Brabant Limburg Gelderland.csv"
  );
  //console.log(response);
  const data = await response.text();
  let count = 0;
  const rows = data.split("\n").splice(1);

  let numOfGroups = Math.ceil(rows.length / 20);

  for (let i = 0; i < numOfGroups; i++) {
    printableCompanyArray[i] = [];
    for (let j = 0; j < 20; j++) {
      if (rows[count] === undefined) {
        break;
      }
      printableCompanyArray[i][j] = rows[count];
      count += 1;
    }
  }
};

getData();
export { printableCompanyArray };

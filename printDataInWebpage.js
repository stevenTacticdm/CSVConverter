import { printableCompanyArray, getNumOfGroups } from './convertCSVtoData.js';

const setupSNInput = async () => {
    let companiesAsString = [];
    
    //set up Sales Navigator input string
    for (let i = 0; i < await getNumOfGroups(); i++){
        companiesAsString[i] = "";
        companiesAsString[i] += "(\"";
        for (let j = 0; j < 20; j++) {
            companiesAsString[i] += printableCompanyArray[i][j];
            if (printableCompanyArray[i][j + 1] === undefined){
                break;
            }
            companiesAsString[i] += "\"" + " OR " + "\"" ;
        }
        companiesAsString[i] += "\")";
    }
    printToHTML(companiesAsString);
}

const setupSNUrl = async (index) => {
    let url = "https://www.linkedin.com/sales/search/people?";
    let endpoint = [];
    let companiesAsSNUrl = [];
    let location;

    console.log(printableCompanyArray[0][0]);

    //construct company part of URL      
        for (let i = 0; i < await getNumOfGroups(); i++){
            endpoint[i] = "";
            endpoint[i] += url;
            endpoint[i] += "companyIncluded=";
            companiesAsSNUrl[i] = "";
            companiesAsSNUrl[i] += "(%2522";
            for (let j = 0; j < 20; j++) {
                let newWord = printableCompanyArray[i][j];

                if(newWord.includes(" ")) {
                    let correctString = "";
                    let tempArray = newWord.split(" ");
                    for (let l = 0; l < tempArray.length; l++){
                        correctString += tempArray[l];
                        if(tempArray[l+1] === undefined){
                            break;
                        }
                        correctString += "%2520";
                    }
                    newWord = correctString;
                }
                companiesAsSNUrl[i] += newWord;
                

                if (printableCompanyArray[i][j + 1] === undefined){
                    break;
                }
                companiesAsSNUrl[i] += "%2522" + "%2520OR%2520" + "%2522" ;
            }
            companiesAsSNUrl[i] += "%2522)";
            
            //finalize URL
            endpoint[i] += companiesAsSNUrl[i];
            endpoint[i] += "&companyTimeScope=CURRENT";
            console.log(endpoint[i]);
        }
    return endpoint[index];
}

const printToHTML = async (companiesAsString) => {

    //push info to HTML page
    for (let i = 0; i < await getNumOfGroups(); i++){
        let outputValues = companiesAsString[i];
        let SNurl = await setupSNUrl(i);
        let linebreak = document.createElement("br");
        let newDiv = document.createElement("div");
        let newP = document.createElement("p");
        
        //Copy Sales Navigator input to clipboard Button
        let copyButton = document.createElement("button");
        copyButton.innerHTML = "Copy to Clipboard";
        copyButton.onclick = async () => {
            let copyText = companiesAsString[i];

            await navigator.clipboard.writeText(copyText);
            alert("Copied to clipboard!");
        };

        //Copy Sales Navigator link to clipboard Button
        let copySNButton = document.createElement("button");
        copySNButton.innerHTML = "Copy Sales Navigator link";
        copySNButton.onclick = async () => {
            let copyText = SNurl;

            await navigator.clipboard.writeText(copyText);
            alert("Copied to clipboard!");
        };

        //Go to Sales Navigator link in new window
        let SNButton = document.createElement("button");
        SNButton.innerHTML = "Go to Sales Navigator";
        SNButton.onclick = async () => {
            window.open(SNurl);
        };

        let newContent = document.createTextNode(outputValues);
        newDiv.appendChild(newP);
        newP.appendChild(newContent);
        newDiv.appendChild(copyButton);
        newDiv.appendChild(copySNButton);
        newDiv.appendChild(SNButton);
        

        let currentDiv = document.getElementById("firstP"); 
        document.body.insertBefore(newDiv, currentDiv);
        
        
    }
    
}


setupSNInput();
setupSNUrl();
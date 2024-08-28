// Use module.exports to export the functions that should be
// available to use from this package.
// module.exports = { <your_function> }

// Once exported, use this statement in your scripts to use the package.
// const myPackage = pm.require('<package_name>')

function costManagementQueryPreRequest(urlCollectionVariableName) {
    const costManagementQueryBaseLink = pm.collectionVariables.get(urlCollectionVariableName)

    const lastTimeTaken = new Date(pm.collectionVariables.get(`${urlCollectionVariableName}.lastTimeTaken`));
    const costManagementQueryNextLink = pm.collectionVariables.get(`${urlCollectionVariableName}.nextLink`);

    if (costManagementQueryNextLink && lastTimeTaken && new Date() - lastTimeTaken < 5 * 1000 * 60) {
        pm.collectionVariables.set(urlCollectionVariableName, costManagementQueryNextLink);
    } else {
        pm.collectionVariables.set(urlCollectionVariableName, costManagementQueryBaseLink);
    }

    pm.collectionVariables.set(`${urlCollectionVariableName}.lastTimeTaken`, new Date())
}


function costManagementQueryPostResponse(urlCollectionVariableName) {
    const response = JSON.parse(pm.response.text());
    const nextLink = response?.properties?.nextLink;

    if (nextLink) {
        pm.collectionVariables.set(`${urlCollectionVariableName}.nextLink`, nextLink);
    }
}
module.exports = {
    costManagementQueryPreRequest,
    costManagementQueryPostResponse
}
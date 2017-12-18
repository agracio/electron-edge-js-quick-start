
const path = require('path');
const baseNetAppPath = path.join(__dirname, '\\src\\QuickStart.Core\\bin\\Debug\\netcoreapp2.0');

process.env.EDGE_USE_CORECLR = 1;
process.env.EDGE_APP_ROOT = baseNetAppPath;

var edge = require('electron-edge-js');

var getAppDomainDirectory = edge.func({
    assemblyFile: path.join(baseNetAppPath, 'QuickStart.Core.dll'),
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'GetAppDomainDirectory'
});

var getCurrentTime = edge.func({
    assemblyFile: path.join(baseNetAppPath, 'QuickStart.Core.dll'),
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'GetCurrentTime'
});

var useDynamicInput = edge.func({
    assemblyFile: path.join(baseNetAppPath, 'QuickStart.Core.dll'),
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'UseDynamicInput'
});

var getPerson = edge.func({
    assemblyFile: path.join(baseNetAppPath, 'QuickStart.Core.dll'),
    typeName: 'QuickStart.Core.ExternalMethods',
    methodName: 'GetPersonInfo'
});


window.onload = function() {

    getAppDomainDirectory('', function(error, result) {
        if (error) throw error;
        document.getElementById("GetAppDomainDirectory").innerHTML = result;
    });

    getCurrentTime('', function(error, result) {
        if (error) throw error;
        document.getElementById("GetCurrentTime").innerHTML = result;
    });

    useDynamicInput('Node.Js', function(error, result) {
        if (error) throw error;
        document.getElementById("UseDynamicInput").innerHTML = result;
    });

        getPerson('', function(error, result) {
            //if (error) throw JSON.stringify(error);
            document.getElementById("GetPersonInfo").innerHTML = result;
        });

};

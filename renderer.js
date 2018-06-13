const path = require('path');
var version = location.search.split('version=')[1];
var namespace = 'QuickStart.' + version.charAt(0).toUpperCase() + version.substr(1);
if(version === 'core') version = 'coreapp';

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net'+ version +'2.0');

process.env.EDGE_USE_CORECLR = 1;
if(version !== 'standard')
    process.env.EDGE_APP_ROOT = baseNetAppPath;

var edge = require('electron-edge-js');

var baseDll = path.join(baseNetAppPath, namespace + '.dll');

var localTypeName = namespace + '.LocalMethods';
var externalTypeName = namespace + '.ExternalMethods';

var getAppDomainDirectory = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetAppDomainDirectory'
});

var getCurrentTime = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetCurrentTime'
});

var useDynamicInput = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'UseDynamicInput'
});

var getPerson = edge.func({
    assemblyFile: baseDll,
    typeName: externalTypeName,
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

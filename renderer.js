const path = require('path');
var net = location.search.split('version=')[1];
var namespace = 'QuickStart.' + net.charAt(0).toUpperCase() + net.substr(1);
if(net === 'core') net = 'coreapp';
var version = net == 'standard' ? '2.1' : '3.1'

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net'+ net + version);

process.env.EDGE_USE_CORECLR = 1;
if(net !== 'standard')
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

var handleException = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'ThrowException'
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
    try{
        handleException('', function(error, result) {
        });

    }catch(e){
        document.getElementById("HandleException").innerHTML = e.Message;
    }

    getPerson('', function(error, result) {
        //if (error) throw JSON.stringify(error);
        document.getElementById("GetPersonInfo").innerHTML = result;
    });

};

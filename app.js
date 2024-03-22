const { ipcMain} = require("electron");
const path = require('path');
var net = process.argv[1].replace('--', '');
var namespace = 'QuickStart.' + net.charAt(0).toUpperCase() + net.substr(1);
if(net === 'core') net = '';
var version = net === 'standard' ? '2.0' : '7.0'

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net' + net + version);

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

var getItem = edge.func({
    source: function () {/* 
        using System.Threading.Tasks;

            public class Person
            {
                public string Name = "Peter Smith";
                public string Email = "peter.smith@electron-edge-js-quick-start.com";
                public int Age = 35;
            }

            public class Startup
            {
                public async Task<object> Invoke(dynamic input)
                {
                    Person person = new Person();
                    return person;
                }
            }  
    */}
});

exports.run = function (window) {
    getItem('', function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'getItem', JSON.stringify( result, null, 2 ));
    });
    getAppDomainDirectory('', function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'getAppDomainDirectory', result);
    });
    getCurrentTime('', function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'getCurrentTime', result);
    });

    useDynamicInput('Node.Js', function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'useDynamicInput', result);
    });

    try{
        handleException('', function(error, result) { });

    }catch(e){
        window.webContents.send("fromMain", 'handleException', e.Message);
    }

    getPerson('', function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'getPerson', result);
    });
}

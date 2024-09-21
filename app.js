const { ipcMain} = require("electron");
const path = require('path');
var net = process.argv[1].replace('--', '');
var framework = net.charAt(0).toUpperCase() + net.substr(1);
var namespace = 'QuickStart.' + framework;
if(net === 'core') net = '';
var version = net === 'standard' ? '2.0' : '8.0'

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net' + net + version);

process.env.EDGE_USE_CORECLR = 1;
if(net !== 'standard')
{
    process.env.EDGE_APP_ROOT = baseNetAppPath;
}

var edge = require('electron-edge-js');

var baseDll = path.join(baseNetAppPath, namespace + '.dll');

var localTypeName = 'QuickStart.LocalMethods';
var externalTypeName = 'QuickStart.ExternalMethods';

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

var getInlinePerson = edge.func({
    source: function () {/* 
        using System.Threading.Tasks;
        using System;

        public class Person
        {
            public Person(string name, string email, int age)
            {
                Id =  Guid.NewGuid();
                Name = name;
                Email = email;
                Age = age;
            }
            public Guid Id {get;}
            public string Name {get;set;}
            public string Email {get;set;}
            public int Age {get;set;}
        }

        public class Startup
        {
            public async Task<object> Invoke(dynamic input)
            {
                return new Person(input.name, input.email, input.age);
            }
        }
    */}
});

exports.run = function (window) {
    getInlinePerson({name: 'Peter Smith', email: 'peter.smith@electron-edge-js-quick-start.com', age: 30}, function(error, result) {
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

    useDynamicInput({framework: framework, node: 'Node.Js'}, function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'useDynamicInput', result);
    });

    try{
        handleException('', function(error, result) { });

    }catch(e){
        window.webContents.send("fromMain", 'handleException', e.Message);
    }

    getPerson({name: 'John Smith', email: 'john.smith@electron-edge-js-quick-start.com', age: 35}, function(error, result) {
        if (error) throw error;
        window.webContents.send("fromMain", 'getPerson', JSON.stringify( result, null, 2 ));
    });
}

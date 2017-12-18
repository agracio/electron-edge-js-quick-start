using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ExternalLibrary;
using Newtonsoft.Json;

namespace QuickStart.Core
{
    class ExternalMethods
    {
        private Library _library = new Library();

        public async Task<object> GetPersonInfo(dynamic input)
        {
            return await Task.Run(() =>JsonConvert.SerializeObject(_library.GetPerson(), Formatting.Indented));
        }
    }
}

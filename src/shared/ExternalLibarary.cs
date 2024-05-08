using System.Threading.Tasks;
using ExternalLibrary;

namespace QuickStart
{
    class ExternalMethods
    {
        public async Task<object> GetPersonInfo(dynamic input)
        {
            return await Task.Run(() => new Person(input.name, input.email, input.age));
        }
    }
}

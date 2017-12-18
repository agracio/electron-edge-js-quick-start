using System;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace QuickStart.Core
{
    public class LocalMethods
    {
        public async Task<object> GetAppDomainDirectory(dynamic input)
        {
            return AppDomain.CurrentDomain.BaseDirectory;
            //// this works which make me think that Newtonsoft.Json.dll is loadable either by being somewhere on disk or 
            //// because of the nature of the assembly.
            //Console.WriteLine(Directory.GetCurrentDirectory());
            //var dd = JsonConvert.SerializeObject("Hello from dot net core 2");
            //Console.WriteLine(dd.ToString());
            //var pp = new SomeClass().GetDateTimeNow();



            //return dd + pp;
            //StringBuilder sb = new StringBuilder();
            //sb.AppendLine(System.IO.Path.GetDirectoryName(
            //    System.Reflection.Assembly.GetExecutingAssembly().Location));
            //sb.AppendLine("-------------------------------------------------------------------------");
            //sb.AppendLine(AppDomain.CurrentDomain.BaseDirectory);
            //sb.AppendLine("-------------------------------------------------------------------------");
            //sb.AppendLine(System.IO.Directory.GetCurrentDirectory());
            //sb.AppendLine("-------------------------------------------------------------------------");
            //sb.AppendLine(Environment.CurrentDirectory);
            //sb.AppendLine("-------------------------------------------------------------------------");


            //var dd = JsonConvert.SerializeObject("Hello from dot net core 2 ");
            //var pp = new SomeClass().GetDateTimeNow();

            //sb.AppendLine(dd + pp);
            //sb.AppendLine("-------------------------------------------------------------------------");


            //return sb.ToString();
        }

        public async Task<object> GetCurrentTime(dynamic input)
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public async Task<object> UseDynamicInput(dynamic input)
        {
            return $".NET Core welcomes {input}";
        }
    }
}

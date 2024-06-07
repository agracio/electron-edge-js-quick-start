using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace QuickStart
{
    public class LocalMethods
    {
        public async Task<object> GetAppDomainDirectory(dynamic input)
        {
            return AppDomain.CurrentDomain.BaseDirectory;
        }

        public async Task<object> GetCurrentTime(dynamic input)
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public async Task<object> UseDynamicInput(dynamic input)
        {
            return $".NET {input.framework} welcomes {input.node}";
        }
        public async Task<object> ThrowException(dynamic input)
        {
            throw new Exception("Sample Exception");
        }
        
        public async Task<object> ListCertificates(dynamic input)
        {
            X509Store store = new X509Store((string)input.storeName, (StoreLocation)Enum.Parse(typeof(StoreLocation), (string)input.storeLocation));
            store.Open(OpenFlags.ReadOnly);
            try
            {
                List<string> result = new List<string>();
                foreach (X509Certificate2 certificate in store.Certificates)
                {
                    result.Add(certificate.Subject);
                }

                return result;
            }
            finally
            {
                store.Close();
            }
        }
    }
}

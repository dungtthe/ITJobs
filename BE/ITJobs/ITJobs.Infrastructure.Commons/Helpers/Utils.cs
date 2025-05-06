using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.Commons.Helpers
{
    public static class Utils
    {
        public static readonly string DesktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);

        public static string GetPathUpload()
        {
            return Path.Combine(DesktopPath, "Uploads");
        }
        public static string GetPathLogException()
        {
            return Path.Combine(DesktopPath, "LogException");
        }
        public static string GetPathLogInformation()
        {
            return Path.Combine(DesktopPath, "LogInformation");
        }
    }
}

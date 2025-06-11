using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.Commons.Helpers
{
    public static class Utils
    {
        private static readonly string DesktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        private static readonly string AppName = "ITJobs";

        public static string GetPathUpload()
        {
            return Path.Combine(DesktopPath, AppName, "Uploads");
        }
        public static string GetPathUploadImage()
        {
            return Path.Combine(DesktopPath, AppName, "Uploads", "Images");
        }
        public static string GetPathUploadCV()
        {
            return Path.Combine(DesktopPath, AppName, "Uploads", "CVs");
        }
        public static string GetPathLogException()
        {
            return Path.Combine(DesktopPath, AppName, "LogException");
        }
        public static string GetPathLogInformation()
        {
            return Path.Combine(DesktopPath, AppName, "LogInformation");
        }
    }
}

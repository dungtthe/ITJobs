namespace ITJobs.Infrastructure.APIs.MyExtensions
{
    public static class HttpContextExtensions
    {
        public static Guid? GetUserId(this HttpContext httpContext)
        {
            var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userIdClaim == null)
            {
                return null;
            }

            if (Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return userId; 
            }

            return null; 
        }
    }
}

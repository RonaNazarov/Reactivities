using System.Net;
using System.Text.Json;
using Application.Core;
using Microsoft.AspNetCore.Connections;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger, 

            IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext contex)
        {
            try
            {
                await _next(contex);
            }
            catch (Exception ex)
            {
                
                _logger.LogError(ex,ex.Message);
                contex.Response.ContentType = "application/json";
                contex.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var respons = _env.IsDevelopment()
                    ? new AppException(contex.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(contex.Response.StatusCode, "Internal server error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(respons,options);
                await contex.Response.WriteAsync(json);
            }
        }
    }
}
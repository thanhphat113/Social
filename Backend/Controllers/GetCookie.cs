using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;


namespace Backend.Controllers
{
	public static class GetCookie
	{
		public static string GetUserIdFromCookie(HttpRequest request)
		{
			var token = request.Cookies["jwt"];
			Console.WriteLine("token: " + token);
			if (string.IsNullOrEmpty(token))
			{
				return null;
			}

			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtToken = tokenHandler.ReadJwtToken(token);
			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

			return userId;
		}
	}
}
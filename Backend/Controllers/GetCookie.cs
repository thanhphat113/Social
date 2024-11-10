using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Backend.Controllers
{
	public static class GetCookie
	{
		public static int GetUserIdFromCookie(HttpRequest request)
		{
			var token = request.Cookies["jwt"];
			if (string.IsNullOrEmpty(token))
			{
				return -1;
			}

			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtToken = tokenHandler.ReadJwtToken(token);
			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
			Console.WriteLine("Đây là userId: " + userId);

			return int.Parse(userId);
		}
	}
}
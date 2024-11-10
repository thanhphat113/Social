
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class RelationshipController : ControllerBase
	{
		private readonly RelationshipService _RelaContext;

		public RelationshipController(RelationshipService relaContext)
		{
			_RelaContext = relaContext;
		}

		[HttpGet]
		public ActionResult<IEnumerable<string>> Get()
		{
			return new string[] { "value1", "value2" };
		}

		[HttpGet("{id}")]
		public ActionResult<IEnumerable<string>> GetFriend()
		{
			return new string[] { "value1", "value2" };
		}

		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
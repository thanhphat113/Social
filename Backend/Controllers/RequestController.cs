using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	public class RequestController : ControllerBase
	{
		private readonly RequestNotiService _NotiContext;
		private readonly RelationshipService _RelaContext;

		public RequestController(RequestNotiService NotiContext, RelationshipService RelaContext)
		{
			_NotiContext = NotiContext;
			_RelaContext = RelaContext;
		}


		[HttpPost]
		public async Task<ActionResult> Accept([FromQuery] int otheruser)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (await _RelaContext.Accept(userId, otheruser))
			{
				if (await _NotiContext.Accept(userId, otheruser)) { Console.WriteLine("Chấp nhận rồi"); }
				else Console.WriteLine("Chưa chấp nhận rồi");
				return await Get(userId);
			}

			return BadRequest("Không thể chấp nhận yêu cầu");
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			var requests = await _NotiContext.FindByUserId(userId);
			return Ok(requests);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> delete(int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			try
			{
				if (await _NotiContext.Delete(id)) return await Get(userId);
				return BadRequest("Xoá không thành công");
			}
			catch (Exception e)
			{
				return BadRequest("Không thể chấp nhận yêu cầu, lỗi: " + e.Data);
			}
		}
	}
}
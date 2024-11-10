using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly UserService _userContext;

		private readonly ChatInMessageService _detailmess;
		private readonly GroupChatService _group;

		private readonly HistorySearchService _historySearchContext;
		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;

		public UserController(GroupChatService group, ChatInMessageService detailmess, UserService UserContext, MessageService mess, HistorySearchService historySearchContext, RequestNotiService NotiContext, PostNotiService PostContext)
		{
			_group = group;
			_detailmess = detailmess;
			_userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_historySearchContext = historySearchContext;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _userContext.GetAll());
		}

		[HttpGet("friends-by-name")]
		public async Task<IActionResult> GetFriendsByName([FromQuery] string name)
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			try
			{
				var friends = await _userContext.GetFriendsByName(UserId, name);
				foreach (var item in friends)
				{
					item.ChatInMessages = await _detailmess.GetMessage(UserId, item.UserId);
				}
				return Ok(friends);
			}
			catch (System.Exception ex)
			{
				return BadRequest("Lỗi: " + ex);
				throw;
			}
		}


		[HttpGet("user-login")]
		public async Task<IActionResult> FindById()
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (userId == -1) return null;

			var information = await _userContext.GetById(userId);
			var friends = await _userContext.GetFriends(userId);
			foreach (var item in friends)
			{
				item.ChatInMessages = await _detailmess.GetMessage(userId, item.UserId);
			}
			var groupchat = await _group.FindByUserId(userId);
			var requests = await _NotiContext.FindByUserId(userId);
			var postrequests = await _PostContext.FindByUserId(userId);
			var historysearch = await _historySearchContext.GetHistorySearchByUserId(userId);
			return Ok(new { information = information, friends = friends, groupchat = groupchat, requests = requests, postrequests = postrequests, historysearch = historysearch });
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Put([FromBody] User user)
		{
			user.GenderId ??= 0;
			return Ok(new { result = await _userContext.Add(user) });
		}

		[HttpGet("users-by-name")]
		public async Task<IActionResult> GetListByName([FromQuery] string name)
		{
			return Ok(await _userContext.GetListByName(name));
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
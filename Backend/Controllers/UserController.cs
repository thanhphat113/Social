using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Backend.Helper;
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

		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;
		private readonly MediaService _media;


		public UserController(MediaService media, GroupChatService group, ChatInMessageService detailmess, UserService UserContext, MessageService mess, RequestNotiService NotiContext, PostNotiService PostContext)
		{
			_group = group;
			_detailmess = detailmess;
			_userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_media = media;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _userContext.GetAll());
		}


		[HttpGet("user-login")]
		public async Task<IActionResult> FindById()
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1) return null;

			var information = await _userContext.GetLoginById(userId);
			var friends = await _userContext.GetFriends(userId);
			var groupchat = await _group.FindByUserId(userId);
			var requests = await _NotiContext.FindByUserId(userId);
			var media = await _media.FindProfilePictureByUserId(userId);
			var postrequests = await _PostContext.FindByUserId(userId);
			return Ok(new { information = information, media = media, friends = friends, groupchat = groupchat, requests = requests, postrequests = postrequests });
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
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var list = await _userContext.GetListByName(name, UserId);
			foreach (var item in list)
			{
				item.ProfilePicture = await _media.FindProfilePictureByUserId(item.UserId);
			}
			return Ok(list);
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
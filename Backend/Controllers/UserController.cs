﻿using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Backend.Helper;
using Backend.Services;
using Backend.DTO;
using Microsoft.IdentityModel.Tokens;
using Backend.Services.Interface;
using Backend.RealTime;


namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly IUserService _userContext;

		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;
		private readonly MediaService _media;
		private readonly IPostService _Post;





		public UserController(MediaService media, IUserService UserContext,
			RequestNotiService NotiContext, PostNotiService PostContext,
			IPostService postService
			)
		{
			_userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_Post = postService;
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

			var friends = await _userContext.GetFriends(userId);
			foreach (var item in friends)
			{
				if (OnlineHub.IsOnline(item.UserId)) item.IsOnline = true;
			}
			var information = await _userContext.GetLoginById(userId);

			var requests = await _NotiContext.FindByUserId(userId);
			var postrequests = await _PostContext.FindByUserId(userId);
			return Ok(new { information = information, friends = friends, requests = requests, postrequests = postrequests });
		}

		//[AllowAnonymous]
		//[HttpPost]
		//public async Task<IActionResult> Put([FromBody] User user)
		//{
		//	user.GenderId ??= 0;
		//	return Ok(new { result = await _userContext.Add(user) });
		//}

		[HttpGet("users-by-name")]
		public async Task<IActionResult> GetListByName([FromQuery] string name)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var list = await _userContext.GetListByName(name, UserId);
			// foreach (var item in list)
			// {
			// 	item.ProfilePicture = await _media.FindProfilePictureByUserId(item.UserId);
			// }
			return Ok(list);
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}


		[HttpPut]
		public async Task<IActionResult> Update([FromBody] User user)
		{

			if (user == null)
			{
				Console.WriteLine(user.UserId + user.FirstName + user.LastName);
				return BadRequest(new { message = "Dữ liệu không hợp lệ" });
			}

			try
			{
				var UserId = MiddleWare.GetUserIdFromCookie(Request);
				user.UserId = UserId;
				Console.WriteLine("user tu token" + UserId);
				var result = await _userContext.Update(user);

				if (result)
				{
					return Ok(new { message = "Cập nhật thông tin người dùng thành công" });
				}
				else
				{
					return NotFound(new { message = "Không tìm thấy người dùng" });
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "Đã xảy ra lỗi trong quá trình cập nhật", error = ex.Message });
			}
		}

		[HttpGet("{userId}")]
		public async Task<IActionResult> GetById(int userId)
		{
			if (userId == -1) return null;

			var friends = await _userContext.GetFriends(userId);
			var user = await _userContext.FindById(userId);
			var post = await _Post.GetPostsByCreatedByUserId(userId);

			if (user == null)
			{
				return NotFound(new { message = "Không tìm thấy người dùng" });
			}
			return Ok(new { information = user, friend = friends, posts = post });

		}



		[HttpPut("change-password")]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
		{

			try
			{
				var userId = MiddleWare.GetUserIdFromCookie(Request);
				var token = Request.Cookies["YourCookieName"];
				Console.WriteLine("Token từ cookie: " + token);
				Console.WriteLine("UserId từ token: " + userId);
				if (userId == null)
				{
					return Unauthorized(new { message = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
				}

				var result = await _userContext.ChangePassword(userId, model.OldPassword, model.NewPassword);
				return result
					? Ok(new { status = 200, message = "Đổi mật khẩu thành công" })
					: BadRequest(new { message = "Mật khẩu cũ không đúng" });
			}
			catch (SecurityTokenExpiredException)
			{
				return Unauthorized(new { message = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
			}
			catch (Exception ex)
			{
				return BadRequest(new { Message = ex.Message });
			}
		}
	}
}
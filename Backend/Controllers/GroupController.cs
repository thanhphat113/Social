using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interface;
using Backend.Helper;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly GroupService _groupService;

        public GroupController(GroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("{groupId}")]
        public async Task<IActionResult> GetGroupById(int groupId)
        {
            try
            {
                var group = await _groupService.GetGroupByIdAsync(groupId);
                return Ok(group);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        //checuser in group
        [HttpGet("check-user-in-group/{groupId}")]
        public async Task<IActionResult> CheckUserInGroup(int groupId)
        {
            try
            {
                var userId = MiddleWare.GetUserIdFromCookie(Request);
                if (userId == -1) return null;
                var result = await _groupService.CheckUserInGroup(userId, groupId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message + "hahaha");
            }
        }

        [HttpPost("request-join/{id}")]
        public async Task<bool> RequestJoinGroup(int id)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            if (userId == -1) return false;


            var userInGroup = new UserInGroup
            {
                UserId = userId,
                GroupId = id,
                DateIn = DateTime.UtcNow,
            };

            var result = await _groupService.addUserToGroup(userInGroup);

            if (result) return true;


            return true;
        }

        // chap nhan tham gia nhom
        [HttpPost("accept-join/{id}")]
        public async Task<IActionResult> AcceptJoinGroup(int id)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            if (userId == -1) return null;


            //update date cuar useringroup
            var result = await _groupService.UpdateDateUserInGroup(userId, id);
            if (result)
            {
                return Ok(new { message = "Đã chấp nhận yêu cầu tham gia nhóm." });
            }
            else
            {
                return NotFound(new { message = "Không thể chấp nhận yêu cầu tham gia nhóm." });
            }

        }


        // [HttpGet("group-list-by-name")]
        // public async Task<IActionResult> GetGroupByName(string Name)
        // {
        // 	return Ok(await _groupService.GetByName(Name));
        // }

        // [HttpPost]
        // public async Task<IActionResult> AddItem([FromBody] UserGroup value)
        // {
        // 	var UserId = MiddleWare.GetUserIdFromCookie(Request);
        // 	value.CreatedByUserId = UserId;
        // 	return Ok(await _groupService.Add(value));
        // }

        // [HttpGet]
        // public async Task<IActionResult> GetAll(int OffSet, int Limit)
        // {
        // 	return Ok(await _groupService.GetAllByCondition(OffSet, Limit));
        // }


        // [HttpGet("{groupId}")]
        // public async Task<IActionResult> GetGroupById(int groupId)
        // {
        // 	try
        // 	{
        // 		var group = await _groupService.GetGroupById(groupId);
        // 		return Ok(group);
        // 	}
        // 	catch (Exception ex)
        // 	{
        // 		return NotFound(ex.Message);
        // 	}
        // }


    }
}
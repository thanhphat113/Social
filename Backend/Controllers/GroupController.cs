using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

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
    public async Task<IActionResult> GetGroupById(int groupId){
        try{
            var user = await _groupService.GetGroupById(groupId);
            return Ok(user);
        }
        catch (Exception ex){
            return NotFound(ex.Message);
        }
    }
    }
}
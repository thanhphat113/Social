using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Group1Controller : ControllerBase
    {
        private readonly IGroupService _unit;
        public Group1Controller(IGroupService unit)
        {
            _unit = unit;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var item = await _unit.GetAll();
            return Ok(item);
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<ActionResult<UserGroup>> CreateGroup([FromBody] UserGroup group)
        {
            if (group == null)
            {
                return BadRequest("Dữ liệu nhóm không hợp lệ.");
            }

            var createdGroup = await _unit.Add(group);
            return Ok(createdGroup);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchGroups(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Tên nhóm không được để trống.");
            }

            var item = await _unit.SearchGroupsByName(name);
            if (item == null)
            {
                return NotFound("Không tìm thấy nhóm.");
            }

            return Ok(item);
        }
    }
}
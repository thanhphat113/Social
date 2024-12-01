using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReactPostController : ControllerBase
{
    private readonly ReactPostService _reactPostService;

    public ReactPostController(ReactPostService reactPostService)
    {
        _reactPostService = reactPostService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllReact()
    {
        var reacts = await _reactPostService.GetAll();
        return Ok(reacts);
    }

    [HttpPost]
    public async Task<IActionResult> AddReact([FromBody] ReactsPost react)
    {
        if (react == null)
        {
            return BadRequest("Invalid react data.");
        }
        
        var result = await _reactPostService.Add(react);
        if (result != null)
        {
            return Ok(new { message = "Reaction added/updated successfully." });
        }

        return BadRequest(new { message = "Failed to add/update reaction." });
    }
}
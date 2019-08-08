using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]

        public async Task<IActionResult>Register(UserForRegisterDTO userForRegisterDTO)
        {
            userForRegisterDTO.Username = userForRegisterDTO.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDTO.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = userForRegisterDTO.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDTO.Password);

            return StatusCode(201);
        }

        // [HttpPost("login")]
        // public async Task<IActionResult>Login(UserForLoginDTO userForLoginDTO)
        // {
        //     var userFromRepo = await _repo.Login(userForLoginDTO.Username, userForLoginDTO.Password);

        //     if (userFromRepo == null)
        //         return Unauthorized();

        //     var claims = new[]
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        //         new Claim(ClaimTypes.Name, userFromRepo.Username)
        //     };

        //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes());
        // }
    }
}
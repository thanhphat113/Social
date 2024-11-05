using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class JwtService
{
    private readonly IConfiguration _config;
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly int _accessTokenExpirationMinutes;
    private readonly int _refreshTokenExpirationDays;

    public JwtService(IConfiguration config)
    {
        _config = config;
        _secretKey = _config["Jwt:SecretKey"];
        _issuer = _config["Jwt:Issuer"];
        _accessTokenExpirationMinutes = int.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);
        _refreshTokenExpirationDays = int.Parse(_config["Jwt:RefreshTokenExpirationDays"]);
    }

    // Tạo Access Token
    public string GenerateAccessToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
				// Sử dụng ClaimTypes.NameIdentifier thay cho ClaimTypes.Id
				new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), // Đặt ID của người dùng vào NameIdentifier
				new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddMinutes(_accessTokenExpirationMinutes),
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    // Tạo Refresh Token (JWT)
    public string GenerateRefreshToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
				// Sử dụng ClaimTypes.NameIdentifier thay cho ClaimTypes.Id
				new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays),
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    // Xác thực và giải mã JWT
    public ClaimsPrincipal ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = false,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return principal;
        }
        catch
        {
            return null;
        }
    }

    public bool IsTokenExpired(ClaimsPrincipal principal)
    {
        var expirationClaim = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
        if (expirationClaim == null) return true;

        var exp = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expirationClaim.Value));
        return exp.UtcDateTime <= DateTime.UtcNow;
    }
}



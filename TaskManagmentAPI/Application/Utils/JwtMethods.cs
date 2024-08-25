using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utils
{
    public static class JwtMethods
    {
        public static long GetUserIdFromJWT(string token)
        {
            try
            {
                string accessToken = string.Empty;
                if (token.ToString().StartsWith("Bearer"))
                {
                    accessToken = token.ToString().Substring("Bearer ".Length).Trim();
                }
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(accessToken);
                var claimValue = securityToken.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
                if (claimValue != null)
                {
                    return long.Parse(claimValue);
                }
                throw new Exception(SystemMessages.TokenNotExist);
            }
            catch (Exception ex)
            {
                //TODO: Logger.Error
                throw new Exception(SystemMessages.ActionFailed);
            }
        }
        public static string GenerateToken(string userId,string Issuer,string Key)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
                {
                   new Claim("UserId", userId.ToString())
                };

            var Sectoken = new JwtSecurityToken(Issuer,
              Issuer,
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);
            return token;
        }
    }
}

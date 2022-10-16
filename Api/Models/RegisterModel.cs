using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class RegisterModel
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}
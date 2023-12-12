using claim_demo_api.models;
using claim_demo_api.Storage;
using Microsoft.AspNetCore.Mvc;

namespace claim_demo_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ClaimsController : ControllerBase
{
    private readonly InMemoryClaimsRepository _repository;

    public ClaimsController(InMemoryClaimsRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<Claim> GetClaim(string customerId)
    {
        var claim = _repository.GetClaim(customerId);
        if (claim == null)
        {
            return NotFound();
        }

        // Construct the full URL for the photo
        var request = HttpContext.Request;
        var baseUri = $"{request.Scheme}://{request.Host.Value}";
        claim.PhotoUrl = $"{baseUri}/Uploads/{claim.PhotoFileName}";

        return Ok(claim);
    }

    [HttpPost]
    public async Task<IActionResult> SubmitClaim(
        [FromForm] string firstName, 
        [FromForm] string lastName, 
        [FromForm] string customerId, 
        [FromForm] string claimDetails, 
        [FromForm] IFormFile photo)
    {
        string photoFileName = null;

        if (photo != null && photo.Length > 0)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            // Ensure the directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // It's a good practice to create a unique file name to avoid overwriting existing files
            photoFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
            var filePath = Path.Combine(uploadPath, photoFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(fileStream);
            }
        }

        // Create a new Claim object
        var claim = new Claim
        {
            FirstName = firstName,
            LastName = lastName,
            CustomerId = customerId,
            ClaimDetails = claimDetails,
            PhotoFileName = photoFileName // Store the unique file name
            // Add other properties as necessary
        };

        // Save claim details in memory
        _repository.AddClaim(claim);

        return Ok();
    }

}



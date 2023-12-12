namespace claim_demo_api.models;

public class Claim
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string CustomerId { get; set; }
    public string ClaimDetails { get; set; }
    public string PhotoFileName { get; set; } // To store the name of the photo file
    public string PhotoUrl { get; set; }
}

public class ClaimResponse
{
    // Define response structure
}

using claim_demo_api.models;

namespace claim_demo_api.Storage;

public class InMemoryClaimsRepository
{
    private readonly List<Claim> _claims = new List<Claim>();

    public void AddClaim(Claim claim)
    {
        _claims.Add(claim);
    }

    public Claim GetClaim(string customerId)
    {
        return _claims.FirstOrDefault(c => c.CustomerId == customerId);
    }
}
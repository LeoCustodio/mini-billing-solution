namespace HackerNewsApi.Options;

public sealed class HackerNewsOptions
{
    public TimeSpan BestStoriesCacheDuration { get; set; } = TimeSpan.FromMinutes(2);
    public TimeSpan StoryCacheDuration { get; set; } = TimeSpan.FromMinutes(5);
    public int MaxConcurrentRequests { get; set; } = 10;
}

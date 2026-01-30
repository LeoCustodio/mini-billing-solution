using HackerNewsApi.Options;
using HackerNewsApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMemoryCache();

builder.Services.Configure<HackerNewsOptions>(options =>
{
    options.BestStoriesCacheDuration = TimeSpan.FromMinutes(2);
    options.StoryCacheDuration = TimeSpan.FromMinutes(5);
    options.MaxConcurrentRequests = 10;
});

builder.Services.AddHttpClient<IHackerNewsClient, HackerNewsClient>(client =>
{
    client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/");
    client.DefaultRequestHeaders.UserAgent.ParseAdd("mini-billing-solution/1.0");
});

var app = builder.Build();

app.MapGet("/api/beststories", async (int? n, IHackerNewsClient client, CancellationToken cancellationToken) =>
{
    if (n is null)
    {
        return Results.BadRequest(new { error = "Query parameter 'n' is required." });
    }

    if (n <= 0)
    {
        return Results.BadRequest(new { error = "Query parameter 'n' must be greater than zero." });
    }

    var stories = await client.GetBestStoriesAsync(n.Value, cancellationToken);
    return Results.Ok(stories);
});

app.Run();

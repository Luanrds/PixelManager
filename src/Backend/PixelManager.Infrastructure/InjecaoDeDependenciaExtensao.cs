using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Repositorios;
using Raven.Client.Documents;

namespace PixelManager.Infrastructure;

public static class InjecaoDeDependenciaExtensao
{
    public static IServiceCollection AdicioneInfraestrutura(this IServiceCollection services, IConfiguration configuracao)
    {
        services.AddSingleton<IDocumentStore>(_ => new DocumentStore
        {
            Urls = configuracao.GetSection("RavenDb:Urls").Get<string[]>() ?? ["http://127.0.0.1:8080"],
            Database = configuracao["RavenDb:Database"] ?? "PixelManager"
        }.Initialize());

        services.AddScoped<IMetadadosDeImagemRepository, MetadadosDeImagemRepository>();
        return services;
    }
}

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PixelManager.Domain.Constantes;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Repositorios;
using Raven.Client.Documents;

namespace PixelManager.Infrastructure;

public static class InjecaoDeDependenciaExtensao
{
    public static IServiceCollection AdicioneInfraestrutura(this IServiceCollection services)
    {
        services.AddSingleton<IDocumentStore>(_ =>
        {
            var urls = Environment.GetEnvironmentVariable("RAVEN_URLS")?.Split(";");

            return new DocumentStore
            {
                Urls = urls,
                Database = NomeDosBancos.PixelManager
            }.Initialize();
        });

        services.AddScoped<IMetadadosDeImagemRepository, MetadadosDeImagemRepository>();
        return services;
    }
}

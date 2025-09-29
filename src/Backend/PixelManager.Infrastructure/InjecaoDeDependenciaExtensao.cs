using Microsoft.Extensions.DependencyInjection;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Repositorios;
using Raven.Client.Documents;
using Raven.Embedded;

namespace PixelManager.Infrastructure;
public static class InjecaoDeDependenciaExtensao
{
	public static void AdicioneInfraestrutura(this IServiceCollection services)
	{
		services.AddSingleton<IDocumentStore>(provider =>
		{
			EmbeddedServer.Instance.StartServer(new ServerOptions
			{
				DataDirectory = "RavenDBData",
				ServerUrl = "http://127.0.0.1:8080"
			});

			return EmbeddedServer.Instance.GetDocumentStore("PixelManagerDB");
		});
		services.AddScoped<IMetadadosDeImagemRepository, MetadadosDeImagemRepository>();
	}
}
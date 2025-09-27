using Microsoft.Extensions.DependencyInjection;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Contexto;
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
			// Inicia o servidor embutido.
			// Por padrão, ele cria os dados em uma pasta dentro do seu projeto.
			EmbeddedServer.Instance.StartServer(new ServerOptions
			{
				// Define onde os dados do banco serão salvos
				DataDirectory = "RavenDBData",
				ServerUrl = "http://127.0.0.1:8080" // Podemos manter o acesso ao Studio
			});

			// Retorna o DocumentStore do servidor que acabamos de iniciar.
			return EmbeddedServer.Instance.GetDocumentStore("PixelManagerDB");
		});
		services.AddSingleton<IMetadadosDeImagemRepository, MetadadosDeImagemRepository>();
	}
}
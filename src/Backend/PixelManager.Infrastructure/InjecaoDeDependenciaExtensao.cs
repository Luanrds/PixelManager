using Microsoft.Extensions.DependencyInjection;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Contexto;
using PixelManager.Infrastructure.Repositorios;

namespace PixelManager.Infrastructure;
public static class InjecaoDeDependenciaExtensao
{
	public static void AdicioneInfraestrutura(this IServiceCollection services)
	{
		services.AddSingleton<InMemoryDatabase>();
		services.AddSingleton<IMetadadosDeImagemRepository, MetadadosDeImagemRepository>();
	}
}
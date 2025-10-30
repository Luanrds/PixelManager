using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Atualizar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.ConsultarPorId;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Criar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;

namespace PixelManager.Application;
public static class InjecaoDeDependenciaExtensao
{
	public static void AdicioneAplicacao(this IServiceCollection services)
	{
		services.AddValidatorsFromAssembly(typeof(InjecaoDeDependenciaExtensao).Assembly);

		services.AddScoped<ICrieMetadadosDeImagemUseCase, CrieMetadadosDeImagemUseCase>();
		services.AddScoped<IAtualizeMetadadosDeImagemUseCase, AtualizeMetadadosDeImagemUseCase>();
		services.AddScoped<IRemovaMetadadosDeImagemUseCase, RemovaMetadadosDeImagemUseCase>();
		services.AddScoped<IConsulteMetadadosDeImagemPorIdUseCase, ConsulteMetadadosDeImagemPorIdUseCase>();
		services.AddScoped<IConsulteTodosMetadadosDeImagemUseCase, ConsulteTodosMetadadosDeImagemUseCase>();

		services.AddScoped<ServicoMetadadosImagens>();
    }
}
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PixelManager.Application.Validadores;

namespace PixelManager.Application;

public static class InjecaoDeDependenciaValidacaoExtensao
{
    public static IServiceCollection AdicioneValidacoes(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<MetadadosDeImagemValidator>();

        return services;
    }
}

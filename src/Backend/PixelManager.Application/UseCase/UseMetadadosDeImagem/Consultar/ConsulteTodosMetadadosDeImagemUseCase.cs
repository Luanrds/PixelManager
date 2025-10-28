using PixelManager.Application.Conversores;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;
using PixelManager.Domain.Repositorios;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;

public class ConsulteTodosMetadadosDeImagemUseCase : IConsulteTodosMetadadosDeImagemUseCase
{
    private readonly IMetadadosDeImagemRepository _repository;

    public ConsulteTodosMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ResponseMetadadosDeImagemJson>> ExecuteAsync(DtoFiltromMetadadosDeImagem filtro)
    {
        var metadadosFiltrados = await _repository.ConsultePorFiltroAsync(filtro);

        return metadadosFiltrados.Select(m => m.Converta()).ToList();
    }
}

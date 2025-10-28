using PixelManager.Application.Conversores;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
public class ConsulteTodosMetadadosDeImagemUseCase : IConsulteTodosMetadadosDeImagemUseCase
{
    private readonly IMetadadosDeImagemRepository _repository;

    public ConsulteTodosMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository)
    {
        _repository = repository;
    }

    public async Task<ResponseConsultaMetadadosDeImagem> ExecuteAsync(DtoFiltromMetadadosDeImagem filtro)
    {
        int contagemTotalGeral = await _repository.ObtenhaContagemTotal();

        IList<MetadadosDeImagem> metadadosFiltrados = await _repository.ConsultePorFiltroAsync(filtro);

        var resposta = new ResponseConsultaMetadadosDeImagem
        {
            TotalGeral = contagemTotalGeral,
            TotalFiltrado = metadadosFiltrados.Count,
            Itens = metadadosFiltrados.Select(m => m.Converta()).ToList() 
        };

        return resposta;
    }
}
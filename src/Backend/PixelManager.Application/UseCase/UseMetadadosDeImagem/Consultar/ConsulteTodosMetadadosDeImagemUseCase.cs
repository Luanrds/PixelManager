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

    public ResponseListaPaginada<ResponseMetadadosDeImagemJson> Execute(DtoFiltromMetadadosDeImagem filtro)
    {
        ListaPaginada<MetadadosDeImagem> metadadosPaginados =
            _repository.ObterTodos(sessao => _repository.ObterPorFiltroPaginacao(sessao, filtro));

        return metadadosPaginados.Converta(entidade => entidade.Converta());
    }
}
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
public interface IConsulteTodosMetadadosDeImagemUseCase
{
    Task<ResponseConsultaMetadadosDeImagem> ExecuteAsync(DtoFiltromMetadadosDeImagem filtro);
}

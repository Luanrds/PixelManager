using PixelManager.Communication.Responses;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
public interface IConsulteTodosMetadadosDeImagemUseCase
{
	Task<List<ResponseMetadadosDeImagemJson>> Execute();
}

using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Criar;
public interface ICrieMetadadosDeImagemUseCase
{
	Task<ResponseMetadadosDeImagemJson> Execute(RequestMetadadosDeImagemJson request);
}

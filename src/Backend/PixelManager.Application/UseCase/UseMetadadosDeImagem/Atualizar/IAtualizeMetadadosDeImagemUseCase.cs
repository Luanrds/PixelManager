using PixelManager.Communication.Request;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Atualizar;
public interface IAtualizeMetadadosDeImagemUseCase
{
	Task Execute(string id, RequestMetadadosDeImagemJson request);
}

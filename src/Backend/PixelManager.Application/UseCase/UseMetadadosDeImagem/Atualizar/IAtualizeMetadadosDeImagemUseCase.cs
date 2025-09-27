using PixelManager.Communication.Request;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Atualizar;
public interface IAtualizeMetadadosDeImagemUseCase
{
	Task Execute(long id, RequestMetadadosDeImagemJson request);
}

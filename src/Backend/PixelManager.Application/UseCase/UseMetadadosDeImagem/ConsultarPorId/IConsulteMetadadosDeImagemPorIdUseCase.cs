using PixelManager.Communication.Responses;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.ConsultarPorId;
public interface IConsulteMetadadosDeImagemPorIdUseCase
{
	Task<ResponseMetadadosDeImagemJson> Execute(long id);
}

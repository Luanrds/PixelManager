using PixelManager.Application.Conversores;
using PixelManager.Communication.Responses;
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

	public async Task<List<ResponseMetadadosDeImagemJson>> Execute()
	{
		IList<MetadadosDeImagem> metadados = await _repository.ConsulteTodos();

		return metadados.Select(m => m.Converta()).ToList();
	}
}
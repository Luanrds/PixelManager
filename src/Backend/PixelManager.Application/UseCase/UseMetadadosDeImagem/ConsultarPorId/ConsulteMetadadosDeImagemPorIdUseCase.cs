using PixelManager.Application.Conversores;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.ConsultarPorId;
public class ConsulteMetadadosDeImagemPorIdUseCase : IConsulteMetadadosDeImagemPorIdUseCase
{
	private readonly IMetadadosDeImagemRepository _repository;

	public ConsulteMetadadosDeImagemPorIdUseCase(IMetadadosDeImagemRepository repository)
	{
		_repository = repository;
	}

	public async Task<ResponseMetadadosDeImagemJson> Execute(long id)
	{
		MetadadosDeImagem? metadados = await _repository.ConsultePorId(id) 
			?? throw new RecursoNaoEncontradoException();

		return metadados.Converta();
	}
}

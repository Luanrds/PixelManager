using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;
internal class RemovaMetadadosDeImagemUseCase : IRemovaMetadadosDeImagemUseCase
{
	private readonly IMetadadosDeImagemRepository _repository;

	public RemovaMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository)
	{
		_repository = repository;
	}

	public async Task Execute(long id)
	{
		MetadadosDeImagem? metadados = await _repository.ConsultePorId(id) 
			?? throw new RecursoNaoEncontradoException();

		await _repository.Remova(id);
	}
}

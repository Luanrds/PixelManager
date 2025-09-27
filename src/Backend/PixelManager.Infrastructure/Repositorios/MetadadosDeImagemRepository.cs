using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Infrastructure.Contexto;

namespace PixelManager.Infrastructure.Repositorios;
public class MetadadosDeImagemRepository : IMetadadosDeImagemRepository
{
	private const long ID_INICIAL = 1L;
	private readonly InMemoryDatabase _dbContext;

	public MetadadosDeImagemRepository(InMemoryDatabase dbContext)
	{
		_dbContext = dbContext;
	}
	public async Task Adicione(MetadadosDeImagem metadados)
	{
		metadados.Id = GerarProximoId();
		_dbContext.MetadadosDeImagens.Add(metadados);
		await Task.CompletedTask;
	}

	public void Atualize(MetadadosDeImagem metadados)
	{
		int index = _dbContext.MetadadosDeImagens.FindIndex(m => m.Id == metadados.Id);

		if (index != -1)
		{
			_dbContext.MetadadosDeImagens[index] = metadados;
		}
	}

	public async Task<MetadadosDeImagem?> ConsultePorId(long id)
	{
		return await Task.FromResult(_dbContext.MetadadosDeImagens.FirstOrDefault(m => m.Id == id));
	}

	public async Task<IList<MetadadosDeImagem>> ConsulteTodos()
	{
		return await Task.FromResult(_dbContext.MetadadosDeImagens.ToList());
	}

	public async Task Remova(long id)
	{
		MetadadosDeImagem? metadados = await ConsultePorId(id);
		if (metadados != null)
		{
			_dbContext.MetadadosDeImagens.Remove(metadados);
		}
	}

	private long GerarProximoId() =>
		_dbContext.MetadadosDeImagens.Count == 0
			? ID_INICIAL
				: _dbContext.MetadadosDeImagens.Max(e => e.Id) + 1;

}
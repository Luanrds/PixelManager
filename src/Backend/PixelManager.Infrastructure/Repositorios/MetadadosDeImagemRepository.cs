using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace PixelManager.Infrastructure.Repositorios;
public class MetadadosDeImagemRepository : IMetadadosDeImagemRepository
{
	//private const long ID_INICIAL = 1L;
	private readonly IDocumentStore _store;

	public MetadadosDeImagemRepository(IDocumentStore store)
	{
		_store = store;
	}

	public async Task Adicione(MetadadosDeImagem metadados)
	{
		using IAsyncDocumentSession session = _store.OpenAsyncSession();
		await session.StoreAsync(metadados);
		await session.SaveChangesAsync();
	}

	public async Task Atualize(MetadadosDeImagem metadados)
	{
		using IAsyncDocumentSession session = _store.OpenAsyncSession();
		await session.StoreAsync(metadados);
		await session.SaveChangesAsync();
	}

	public async Task<MetadadosDeImagem?> ConsultePorId(string id)
	{
		using IAsyncDocumentSession session = _store.OpenAsyncSession();
		return await session.LoadAsync<MetadadosDeImagem>(id);
	}

	public async Task<IList<MetadadosDeImagem>> ConsulteTodos()
	{
		using IAsyncDocumentSession session = _store.OpenAsyncSession();
		return await session.Query<MetadadosDeImagem>().ToListAsync();
	}

	public async Task Remova(string id)
	{
		MetadadosDeImagem? metadados = await ConsultePorId(id);
		if (metadados != null)
		{
			using IAsyncDocumentSession session = _store.OpenAsyncSession();
			session.Delete(id);
			await session.SaveChangesAsync();
		}
	}

	//private long GerarProximoId() =>
	//	_dbContext.MetadadosDeImagens.Count == 0
	//		? ID_INICIAL
	//			: _dbContext.MetadadosDeImagens.Max(e => e.Id) + 1;
}
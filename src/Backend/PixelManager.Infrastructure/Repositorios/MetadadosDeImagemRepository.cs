using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Extensoes;
using PixelManager.Domain.Repositorios;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace PixelManager.Infrastructure.Repositorios;
public class MetadadosDeImagemRepository(IDocumentStore store) : IMetadadosDeImagemRepository
{
	private readonly IDocumentStore _store = store;

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

    public T ObterTodos<T>(Func<IDocumentSession, T> execucao)
    {
        return Obter(execucao);
    }

    protected T Obter<T>(Func<IDocumentSession, T> execucao)
    {
        using var session = _store.OpenSession();
        return execucao.Invoke(session);
    }

    public ListaPaginada<MetadadosDeImagem> ObterPorFiltroPaginacao(IDocumentSession sessao, DtoFiltromMetadadosDeImagem filtro)
    {
        var query = ObterQueryPor(sessao, filtro);
        return query.ObterPaginacao(sessao, filtro);
    }

    private IRavenQueryable<MetadadosDeImagem> ObterQueryPor(IDocumentSession sessao, DtoFiltromMetadadosDeImagem? filtro = null)
    {
        filtro ??= new();
        var query = sessao.Query<MetadadosDeImagem>();

        if (!string.IsNullOrWhiteSpace(filtro.NomeDoArquivo))
            query = query.Search(x => x.NomeDoArquivo, filtro.NomeDoArquivo);

        if (filtro.TipoDoArquivo.HasValue)
            query = query.Where(x => x.TipoDoArquivo == filtro.TipoDoArquivo.Value);

        //if (filtro.DataDeCriacaoInicial.HasValue)
        //    query = query.Where(x => x.DataDeCriacao >= filtro.DataDeCriacaoInicial.Value);

        //if (filtro.DataDeCriacaoFinal.HasValue)
        //    query = query.Where(x => x.DataDeCriacao <= filtro.DataDeCriacaoFinal.Value);

        return query;
    }
}
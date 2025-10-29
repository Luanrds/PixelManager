using PixelManager.Domain.Entidades;
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

    public async Task<IList<MetadadosDeImagem>> ConsultePorFiltroAsync(DtoFiltroMetadadosDeImagem filtro)
    {
        using IAsyncDocumentSession session = _store.OpenAsyncSession();
        IRavenQueryable<MetadadosDeImagem> query = session.Query<MetadadosDeImagem>();
        query = ObterQueryPor(query, filtro);
        return await query.ToListAsync();
    }

    public async Task Remova(string id)
    {
        using IAsyncDocumentSession session = _store.OpenAsyncSession();
        MetadadosDeImagem? metadados = await session.LoadAsync<MetadadosDeImagem>(id);

        if (metadados is not null)
        {
            session.Delete(metadados);
            await session.SaveChangesAsync();
        }
    }

    private IRavenQueryable<MetadadosDeImagem> ObterQueryPor(IRavenQueryable<MetadadosDeImagem> query, DtoFiltroMetadadosDeImagem filtro)
    {
        filtro ??= new();

        if (!string.IsNullOrWhiteSpace(filtro.NomeDoArquivo))
        {
            query = query.ComNomeDoArquivo(filtro.NomeDoArquivo);
        }

        if (filtro.TiposDoArquivo is { Count: > 0 })
        {
            query = query.ComTiposDeArquivo(filtro.TiposDoArquivo);
        }

        if (filtro.DataDeCriacaoInicial is not null)
        {
            query = query.ComDataDeCriacaoInicial(filtro.DataDeCriacaoInicial.Value);
        }

        if (filtro.DataDeCriacaoFinal is not null)
        {
            query = query.ComDataDeCriacaoFinal(filtro.DataDeCriacaoFinal.Value);
        }

        return query;
    }
}
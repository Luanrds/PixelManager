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

    public async Task<int> ObtenhaContagemTotal()
    {
        using IAsyncDocumentSession session = _store.OpenAsyncSession();
        return await session.Query<MetadadosDeImagem>().CountAsync();
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

    public async Task<IList<MetadadosDeImagem>> ConsultePorFiltroAsync(DtoFiltromMetadadosDeImagem filtro)
    {
        using IAsyncDocumentSession session = _store.OpenAsyncSession();
        IRavenQueryable<MetadadosDeImagem> query = session.Query<MetadadosDeImagem>();
        query = ObterQueryPor(query, filtro);
        return await query.ToListAsync();
    }

    private IRavenQueryable<MetadadosDeImagem> ObterQueryPor(IRavenQueryable<MetadadosDeImagem> query, DtoFiltromMetadadosDeImagem? filtro = null)
    {
        filtro ??= new();

        if (!string.IsNullOrWhiteSpace(filtro.NomeDoArquivo))
        {
            query = query.ComNomeDoArquivo(filtro.NomeDoArquivo);
        }

        if (filtro.TiposDoArquivo != null && filtro.TiposDoArquivo.Any())
        {
            query = query.ComTiposDeArquivo(filtro.TiposDoArquivo);
        }

        if (filtro.DataDeCriacaoInicial.HasValue)
        {
            query = query.ComDataDeCriacaoInicial(filtro.DataDeCriacaoInicial.Value);
        }

        if (filtro.DataDeCriacaoFinal.HasValue)
        {
            query = query.ComDataDeCriacaoFinal(filtro.DataDeCriacaoFinal.Value);
        }

        return query;
    }
}
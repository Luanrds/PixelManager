using PixelManager.Domain.Entidades;
using PixelManager.Domain.Enum;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace PixelManager.Domain.Extensoes;

public static class ExtensoesDasQueriesDeMetadadosDeImagem
{
    public static IRavenQueryable<MetadadosDeImagem> MetadadosDeImagems(this IAsyncDocumentSession documentoSession)
    {
        return documentoSession.Query<MetadadosDeImagem>();
    }

    public static IRavenQueryable<MetadadosDeImagem> ComNomeDoArquivo(this IRavenQueryable<MetadadosDeImagem> query, string nomeDoArquivo)
    {
        return query.Search(x => x.NomeDoArquivo, $"*{nomeDoArquivo}*", options: SearchOptions.And);
    }

    public static IRavenQueryable<MetadadosDeImagem> ComTiposDeArquivo(this IRavenQueryable<MetadadosDeImagem> query, IEnumerable<TipoArquivo> tipos)
    {
        return query.Where(x => x.TipoDoArquivo.In(tipos));
    }

    public static IRavenQueryable<MetadadosDeImagem> ComDataDeCriacaoInicial(this IRavenQueryable<MetadadosDeImagem> query, DateTime dataInicial)
    {
        return query.Where(x => x.DataDeCriacao >= dataInicial);
    }

    public static IRavenQueryable<MetadadosDeImagem> ComDataDeCriacaoFinal(this IRavenQueryable<MetadadosDeImagem> query, DateTime dataFinal)
    {
        return query.Where(x => x.DataDeCriacao <= dataFinal);
    }
}
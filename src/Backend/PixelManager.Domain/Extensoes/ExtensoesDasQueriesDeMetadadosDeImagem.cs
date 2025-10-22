using PixelManager.Domain.Entidades;
using PixelManager.Domain.Enum;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;

namespace PixelManager.Domain.Extensoes;

public static class ExtensoesDasQueriesDeMetadadosDeImagem
{
    public static IRavenQueryable<MetadadosDeImagem> ComNomeDoArquivo(this IRavenQueryable<MetadadosDeImagem> query, string nomeDoArquivo)
    {
        return query.Search(x => x.NomeDoArquivo, $"*{nomeDoArquivo}*");
    }

    public static IRavenQueryable<MetadadosDeImagem> ComTipoDeArquivo(this IRavenQueryable<MetadadosDeImagem> query, TipoArquivo tipo)
    {
        return query.Where(x => x.TipoDoArquivo == tipo);
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

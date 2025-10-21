using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Entidades;

namespace PixelManager.Application.Conversores;
public static class Conversor
{
	public static MetadadosDeImagem Converta(this RequestMetadadosDeImagemJson request) => 
		new()
		{
			NomeDoArquivo = request.NomeDoArquivo,
			TipoDoArquivo = request.TipoDoArquivo,
			Altura = request.Altura,
			Comprimento = request.Comprimento
		};

	public static ResponseMetadadosDeImagemJson Converta(this MetadadosDeImagem entidade) => 
		new()
		{
			Id = entidade.Id,
			NomeDoArquivo = entidade.NomeDoArquivo,
			TipoDoArquivo = entidade.TipoDoArquivo,
			Altura = entidade.Altura,
			Comprimento = entidade.Comprimento,
			Proporcao = entidade.Proporcao,
			DataDeCriacao = entidade.DataDeCriacao
		};

    public static ResponseListaPaginada<TDestino> Converta<TOrigem, TDestino>(this ListaPaginada<TOrigem> listaPaginada, Func<TOrigem, TDestino> conversor)
    {
        return new ResponseListaPaginada<TDestino>
        {
            QuantidadeTotal = listaPaginada.QuantidadeTotal,
            TotalFiltrado = listaPaginada.TotalFiltrado,
            Pagina = listaPaginada.Pagina,
            LinhasPorPagina = listaPaginada.LinhasPorPagina,
            Dados = listaPaginada.Dados.Select(conversor).ToList()
        };
    }
}

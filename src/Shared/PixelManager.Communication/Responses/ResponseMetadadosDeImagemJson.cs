using PixelManager.Domain.Entidades;
using PixelManager.Domain.Enum;

namespace PixelManager.Communication.Responses;
public class ResponseMetadadosDeImagemJson
{
    public string Id { get; set; } = string.Empty;
    public string NomeDoArquivo { get; set; } = string.Empty;
    public TipoArquivo TipoDoArquivo { get; set; }
    public int Altura { get; set; }
    public int Comprimento { get; set; }
    public float Proporcao { get; set; }
    public DateTime DataDeCriacao { get; set; }

    public static ResponseMetadadosDeImagemJson ConvertaDeEntidade(MetadadosDeImagem entidade) =>
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
}

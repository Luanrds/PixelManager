using PixelManager.Domain.Entidades;
using PixelManager.Domain.Enum;

namespace PixelManager.Communication.Request;
public class RequestMetadadosDeImagemJson
{
    public string NomeDoArquivo { get; set; } = string.Empty;
    public TipoArquivo TipoDoArquivo { get; set; }
    public int Altura { get; set; }
    public int Comprimento { get; set; }

    public MetadadosDeImagem ConverterParaEntidade() =>
        new()
        {
            NomeDoArquivo = NomeDoArquivo,
            TipoDoArquivo = TipoDoArquivo,
            Altura = Altura,
            Comprimento = Comprimento
        };
}
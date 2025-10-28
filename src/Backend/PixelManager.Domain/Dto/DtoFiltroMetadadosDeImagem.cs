using PixelManager.Domain.Enum;

namespace PixelManager.Domain.Dto;

public class DtoFiltroMetadadosDeImagem
{
    public string NomeDoArquivo { get; set; } = string.Empty;
    public IList<TipoArquivo>? TiposDoArquivo { get; set; }
    public DateTime? DataDeCriacaoInicial { get; set; }
    public DateTime? DataDeCriacaoFinal { get; set; }
}

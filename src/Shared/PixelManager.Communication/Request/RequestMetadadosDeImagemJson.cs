using PixelManager.Domain.Enum;

namespace PixelManager.Communication.Request;
public class RequestMetadadosDeImagemJson
{
	public string NomeDoArquivo { get; set; } = string.Empty;
	public TipoArquivo TipoDoArquivo { get; set; }
	public int Altura { get; set; }
	public int Comprimento { get; set; }
}
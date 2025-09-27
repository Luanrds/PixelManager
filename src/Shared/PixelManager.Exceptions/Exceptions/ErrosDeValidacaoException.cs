using System.Net;

namespace PixelManager.Exceptions.Exceptions;
public class ErrosDeValidacaoException : PixelManagerExceptions
{
	private readonly IList<string> _mensagensDeErro;
	public ErrosDeValidacaoException(IList<string> mensagensDeErro) : base(string.Empty)
	{
		_mensagensDeErro = mensagensDeErro;
	}

	public override IList<string> GetMensagensDeErro() => _mensagensDeErro;

	public override HttpStatusCode GetStatusCode() => HttpStatusCode.BadRequest;
}

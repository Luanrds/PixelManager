using System.Net;

namespace PixelManager.Exceptions.Exceptions;
public class RecursoNaoEncontradoException : PixelManagerExceptions
{
	public RecursoNaoEncontradoException() : base("Recurso não encontrado.")
	{
	}

	public override IList<string> GetMensagensDeErro()
	{
		return [Message];
	}

	public override HttpStatusCode GetStatusCode()
	{
		return HttpStatusCode.NotFound;
	}
}
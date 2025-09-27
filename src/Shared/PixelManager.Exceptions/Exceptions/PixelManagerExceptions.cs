using System.Net;

namespace PixelManager.Exceptions.Exceptions;
public abstract class PixelManagerExceptions(string messagem) : SystemException(messagem)
{
	public abstract IList<string> GetMensagensDeErro();
	public abstract HttpStatusCode GetStatusCode();
}

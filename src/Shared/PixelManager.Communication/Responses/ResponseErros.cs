namespace PixelManager.Communication.Responses;
public class ResponseErros
{
	public IList<string> Errors { get; set; }

	public ResponseErros(IList<string> errors) => Errors = errors;

	public ResponseErros(string error)
	{
		Errors = new List<string>
		{
			error
		};
	}
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PixelManager.Communication.Responses;
using PixelManager.Exceptions.Exceptions;
using System.Net;

namespace PixelManager.API.Filtros;

public class ExceptionFilter : IExceptionFilter
{
	public void OnException(ExceptionContext context)
	{
		if (context.Exception is PixelManagerExceptions pixelManagerExceptions)
		{
			HandleProjectException(pixelManagerExceptions, context);
		}
		else
		{
			ThrowUnknowException(context);
		}
	}

	private static void HandleProjectException(PixelManagerExceptions pixelManagerExceptions, ExceptionContext context)
	{
		context.HttpContext.Response.StatusCode = (int)pixelManagerExceptions.GetStatusCode();
		context.Result = new ObjectResult(new ResponseErros(pixelManagerExceptions.GetMensagensDeErro()));
	}

	private static void ThrowUnknowException(ExceptionContext context)
	{
		context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
		context.Result = new ObjectResult(new ResponseErros(["Erro Desconhecido"]));
	}
}

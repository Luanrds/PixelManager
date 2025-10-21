using Microsoft.AspNetCore.Mvc;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Atualizar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.ConsultarPorId;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Criar;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;
using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;

namespace PixelManager.API.Controllers;

public class MetadadosDeImagemController : PixelManagerBaseController
{
	[HttpPost]
	[ProducesResponseType(typeof(ResponseMetadadosDeImagemJson), StatusCodes.Status201Created)]
	[ProducesResponseType(typeof(ResponseErros), StatusCodes.Status204NoContent)]
	public async Task<IActionResult> Crie(
		[FromServices] ICrieMetadadosDeImagemUseCase useCase,
		[FromBody] RequestMetadadosDeImagemJson request)
	{
		ResponseMetadadosDeImagemJson response = await useCase.Execute(request);
		return Created(string.Empty, response);
	}

    [HttpGet]
    [ProducesResponseType(typeof(List<ResponseMetadadosDeImagemJson>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status204NoContent)]
    public IActionResult ConsulteTodos(
        [FromServices] IConsulteTodosMetadadosDeImagemUseCase useCase,
        [FromQuery] DtoFiltromMetadadosDeImagem filtro)
    {
        List<ResponseMetadadosDeImagemJson> response = useCase.Execute(filtro);

        if (response.Count != 0)
        {
            return Ok(response);
        }

        return NoContent();
    }

    [HttpGet]
	[Route("{*id}")]
	[ProducesResponseType(typeof(ResponseMetadadosDeImagemJson), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
	public async Task<IActionResult> ConsultePorId(
	[FromServices] IConsulteMetadadosDeImagemPorIdUseCase useCase,
	[FromRoute] string id)
	{
		ResponseMetadadosDeImagemJson response = await useCase.Execute(id);
		return Ok(response);
	}

	[HttpPut]
	[Route("{*id}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
	public async Task<IActionResult> Atualize(
	[FromServices] IAtualizeMetadadosDeImagemUseCase useCase,
	[FromRoute] string id,
	[FromBody] RequestMetadadosDeImagemJson request)
	{
		await useCase.Execute(id, request);
		return NoContent();
	}

	[HttpDelete]
	[Route("{*id}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
	public async Task<IActionResult> Remove(
	[FromServices] IRemovaMetadadosDeImagemUseCase useCase,
	[FromRoute] string id)
	{
		await useCase.Execute(id);
		return NoContent();
	}
}

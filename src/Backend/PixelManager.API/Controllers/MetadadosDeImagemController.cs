using Microsoft.AspNetCore.Mvc;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;

namespace PixelManager.API.Controllers;

public class MetadadosDeImagemController : PixelManagerBaseController
{
    private readonly ServicoMetadadosImagens _servicoMetadadosImagens;

    public MetadadosDeImagemController(ServicoMetadadosImagens servico)
    {
        _servicoMetadadosImagens = servico;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ResponseMetadadosDeImagemJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Crie([FromBody] RequestMetadadosDeImagemJson request)
    {
        var response = await _servicoMetadadosImagens.Criar(request);
        return Created(string.Empty, response);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ResponseMetadadosDeImagemJson>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ConsulteTodos([FromQuery] DtoFiltroMetadadosDeImagem filtro)
    {
        var response = await _servicoMetadadosImagens.ObterTodos(filtro);

        if (response.Any())
        {
            return Ok(response);
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ResponseMetadadosDeImagemJson), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ConsultePorId([FromRoute] string id)
    {
        var response = await _servicoMetadadosImagens.ObterPorId(id);
        return Ok(response);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Atualize(
        [FromRoute] string id,
        [FromBody] RequestMetadadosDeImagemJson request)
    {
        await _servicoMetadadosImagens.Atualizar(id, request);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ResponseErros), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Deletar([FromRoute] string id)
    {
        await _servicoMetadadosImagens.Deletar(id);
        return NoContent();
    }
}

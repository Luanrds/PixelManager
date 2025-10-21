namespace PixelManager.Domain.Interfaces;

public interface IPaginacao
{
    int LinhasPorPagina { get; set; }
    int Pagina { get; set; }
}

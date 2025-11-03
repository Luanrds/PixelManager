using PixelManager.API.Filtros;
using PixelManager.Application;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(ExceptionFilter));
});

builder.Services.AdicioneValidacoes();
builder.Services.AdicioneInfraestrutura(builder.Configuration);
builder.Services.AddScoped<ServicoMetadadosImagens>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var origins = Environment.GetEnvironmentVariable("Cors_Origins")?.Split(";") ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins(origins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();

app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true
});

app.UseCors("PermitirFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program
{
    protected Program() { }
}
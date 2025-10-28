using PixelManager.API.Filtros;
using PixelManager.Application;
using PixelManager.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
	options.Filters.Add(typeof(ExceptionFilter));
});

builder.Services.AdicioneAplicacao();
builder.Services.AdicioneInfraestrutura();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins("https://localhost:7232")
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